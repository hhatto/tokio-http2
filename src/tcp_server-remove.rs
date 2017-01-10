use std::io;
use std::marker::PhantomData;
use std::net::SocketAddr;
use std::sync::Arc;
use std::thread;
use std::ops::Fn;

use net2;
use futures::stream::Stream;
use futures::future::FutureResult;
use futures::{future, IntoFuture};
use futures::{Future, Map};
use tokio_core::net::{TcpStream, TcpListener};
use tokio_core::reactor::{Core, Handle};
use tokio_proto::BindServer;
use tokio_service::{Service, NewService};

use http::{Request, Response};

// NOTE: May want to keep this code in sync with tokio-proto::tcp_server in the event something
// interesting is added OR we want to send this code back and implement additional Protocol/Codec
// code to do the same.

// *lsio* updated begin...

/// HttpService is the Service that encapsulates the inner Service so as to provide access downstream
/// to additional functionality.
#[derive(Clone, Copy, Debug)]
pub struct HttpService<S> {
    inner: S,
    remote_addr: SocketAddr,
}

// NB: There are other ways to do this without hijacking the Service such as creating a Protocol
// and Transport Frame see: https://github.com/sinkuu/tokio-framecodecs/blob/master/src/remote_addr.rs
// but this works. Using the other way will allow you not to modify the generic tcp_server code
// but we want to in this case because of other reasons.

// NOTE: Service does NOT have any additional restriction like Service<Request=Request...> so compiler
// will pass through BindServer::ServiceRequest params else the compiler will complain!

impl<S> Service for HttpService<S>
    where S: Service
{
    type Request = S::Request;
    type Response = S::Response;
    type Error = S::Error;
    type Future = S::Future;

    fn call(&mut self, req: Self::Request) -> Self::Future {
        // let req = Request
        // req.set_remote_addr(self.remote_addr);
        self.inner.call(req).into_future()
    }
}
// *lsio* updated end

// TODO: Add more options, e.g.:
// - max concurrent requests
// - request timeout
// - read timeout
// - write timeout
// - max idle time
// - max lifetime

/// A builder for TCP servers.
///
/// Setting up a server needs, at minimum:
///
/// - A server protocol implementation
/// - An address
/// - A service to provide
///
/// In addition to those basics, the builder provides some additional
/// configuration, which is expected to grow over time.
///
/// See the crate docs for an example.
pub struct TcpServer<Kind, P> {
    _kind: PhantomData<Kind>,
    proto: Arc<P>,
    threads: usize,
    addr: SocketAddr,
}

impl<Kind, P> TcpServer<Kind, P> where
    P: BindServer<Kind, TcpStream> + Send + Sync + 'static
{
    /// Starts building a server for the given protocol and address, with
    /// default configuration.
    ///
    /// Generally, a protocol is implemented *not* by implementing the
    /// `BindServer` trait directly, but instead by implementing one of the
    /// protocol traits:
    ///
    /// - `pipeline::ServerProto`
    /// - `multiplex::ServerProto`
    /// - `streaming::pipeline::ServerProto`
    /// - `streaming::multiplex::ServerProto`
    ///
    /// See the crate documentation for more details on those traits.
    pub fn new(protocol: P, addr: SocketAddr) -> TcpServer<Kind, P> {
        TcpServer {
            _kind: PhantomData,
            proto: Arc::new(protocol),
            threads: 1,
            addr: addr,
        }
    }

    /// Set the address for the server.
    pub fn addr(&mut self, addr: SocketAddr) {
        self.addr = addr;
    }

    /// Set the number of threads running simultaneous event loops (Unix only).
    pub fn threads(&mut self, threads: usize) {
        assert!(threads > 0);
        if cfg!(unix) {
            self.threads = threads;
        }
    }

    /// Start up the server, providing the given service on it.
    ///
    /// This method will block the current thread until the server is shut down.
    pub fn serve<S>(&self, new_service: S) where
        S: NewService<Request = P::ServiceRequest,
                      Response = P::ServiceResponse,
                      Error = P::ServiceError> + Send + Sync + 'static,
    {
        let new_service = Arc::new(new_service);
        self.with_handle(move |_| new_service.clone())
    }

    /// Start up the server, providing the given service on it, and providing
    /// access to the event loop handle.
    ///
    /// The `new_service` argument is a closure that is given an event loop
    /// handle, and produces a value implementing `NewService`. That value is in
    /// turned used to make a new service instance for each incoming connection.
    ///
    /// This method will block the current thread until the server is shut down.
    pub fn with_handle<F, S>(&self, new_service: F) where
        F: Fn(&Handle) -> S + Send + Sync + 'static,
        S: NewService<Request = P::ServiceRequest,
                      Response = P::ServiceResponse,
                      Error = P::ServiceError> + Send + Sync + 'static,
    {
        let proto = self.proto.clone();
        let new_service = Arc::new(new_service);
        let addr = self.addr;
        let workers = self.threads;

        let threads = (0..self.threads - 1).map(|i| {
            let proto = proto.clone();
            let new_service = new_service.clone();

            thread::Builder::new().name(format!("worker{}", i)).spawn(move || {
                serve(proto, addr, workers, &*new_service)
            }).unwrap()
        }).collect::<Vec<_>>();

        serve(proto, addr, workers, &*new_service);

        for thread in threads {
            thread.join().unwrap();
        }
    }
}

fn serve<P, Kind, F, S>(binder: Arc<P>, addr: SocketAddr, workers: usize, new_service: &F)
    where P: BindServer<Kind, TcpStream>,
          F: Fn(&Handle) -> S,
          S: NewService<Request = P::ServiceRequest,
                        Response = P::ServiceResponse,
                        Error = P::ServiceError> + 'static,
{
    let mut core = Core::new().unwrap();
    let handle = core.handle();
    let new_service = new_service(&handle);
    let listener = listener(&addr, workers, &handle).unwrap();

    let server = listener.incoming().for_each(move |(socket, remote_addr)| {
        // Create the service
        // *lsio* add - Original let service = try!(new_service.new_service());
        let service = HttpService{
            inner: try!(new_service.new_service()),
            remote_addr: remote_addr,
        };

        // Bind it!
        binder.bind_server(&handle, socket, service);

        Ok(())
    });

    core.run(server).unwrap();
}

fn listener(addr: &SocketAddr,
            workers: usize,
            handle: &Handle) -> io::Result<TcpListener> {
    let listener = match *addr {
        SocketAddr::V4(_) => try!(net2::TcpBuilder::new_v4()),
        SocketAddr::V6(_) => try!(net2::TcpBuilder::new_v6()),
    };
    try!(configure_tcp(workers, &listener));
    try!(listener.reuse_address(true));
    try!(listener.bind(addr));
    listener.listen(1024).and_then(|l| {
        TcpListener::from_listener(l, addr, handle)
    })
}

#[cfg(unix)]
fn configure_tcp(workers: usize, tcp: &net2::TcpBuilder) -> io::Result<()> {
    use net2::unix::*;

    if workers > 1 {
        try!(tcp.reuse_port(true));
    }

    Ok(())
}

#[cfg(windows)]
fn configure_tcp(workers: usize, _tcp: &net2::TcpBuilder) -> io::Result<()> {
    Ok(())
}
