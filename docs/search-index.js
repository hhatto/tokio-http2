var searchIndex = {};
searchIndex["tokio_http2"] = {"doc":"This library supplies the required modules to implement HTTP/2 which includes the HPACK header\ncompression that includes the Huffman encoding/decoding features.","items":[[0,"http2","tokio_http2","This library module provides HTTP/2 parsing and buffer frames used for HTTP/2.",null,null],[0,"hpack","","This library module provides the required HPACK compression used for HTTP/2 headers.\nA module implementing HPACK functionality. Exposes a simple API for\nperforming the encoding and decoding of header sets, according to the\nHPACK spec.",null,null],[0,"encoder","tokio_http2::hpack","Implements all functionality related to encoding header blocks using\nHPACK.",null,null],[3,"Encoder","tokio_http2::hpack::encoder","Represents an HPACK encoder. Allows clients to encode arbitrary header sets\nand tracks the encoding context. That is, encoding subsequent header sets\nwill use the context built by previous encode calls.",null,null],[5,"encode_integer_into","","Encode an integer to the representation defined by HPACK, writing it into the provider\n`io::Write` instance. Also allows the caller to specify the leading bits of the first\noctet. Any bits that are already set within the last `prefix_size` bits will be cleared\nand overwritten by the integer&#39;s representation (in other words, only the first\n`8 - prefix_size` bits from the `leading_bits` octet are reflected in the first octet\nemitted by the function.",null,{"inputs":[{"name":"usize"},{"name":"u8"},{"name":"u8"},{"name":"w"}],"output":{"name":"result"}}],[5,"encode_integer","","Encode an integer to the representation defined by HPACK.",null,{"inputs":[{"name":"usize"},{"name":"u8"}],"output":{"name":"vec"}}],[11,"new","","Creates a new `Encoder` with a default static table, as defined by the\nHPACK spec (Appendix A).",0,{"inputs":[],"output":{"name":"encoder"}}],[11,"encode","","Encodes the given headers using the HPACK rules and returns a newly\nallocated `Vec` containing the bytes representing the encoded header\nset.",0,null],[11,"encode_into","","Encodes the given headers into the given `io::Write` instance. If the io::Write raises an\nError at any point, this error is propagated out. Any changes to the internal state of the\nencoder will not be rolled back, though, so care should be taken to ensure that the paired\ndecoder also ends up seeing the same state updates or that their pairing is cancelled.",0,null],[11,"encode_header_into","","Encodes a single given header into the given `io::Write` instance.",0,null],[0,"decoder","tokio_http2::hpack","Exposes the struct `Decoder` that allows for HPACK-encoded header blocks to\nbe decoded into a header list.",null,null],[3,"Decoder","tokio_http2::hpack::decoder","Decodes headers encoded using HPACK.",null,null],[4,"IntegerDecodingError","","Represents all errors that can be encountered while decoding an\ninteger.",null,null],[13,"TooManyOctets","","5.1. specifies that &quot;excessively large integer decodings&quot; MUST be\nconsidered an error (whether the size is the number of octets or\nvalue). This variant corresponds to the encoding containing too many\noctets.",1,null],[13,"ValueTooLarge","","The variant corresponds to the case where the value of the integer\nbeing decoded exceeds a certain threshold.",1,null],[13,"NotEnoughOctets","","When a buffer from which an integer was supposed to be encoded does\nnot contain enough octets to complete the decoding.",1,null],[13,"InvalidPrefix","","Only valid prefixes are [1, 8]",1,null],[4,"StringDecodingError","","Represents all errors that can be encountered while decoding an octet\nstring.",null,null],[13,"NotEnoughOctets","","",2,null],[13,"HuffmanDecoderError","","",2,null],[4,"DecoderError","","Represents all errors that can be encountered while performing the decoding\nof an HPACK header set.",null,null],[13,"HeaderIndexOutOfBounds","","",3,null],[13,"IntegerDecodingError","","",3,null],[13,"StringDecodingError","","",3,null],[13,"InvalidMaxDynamicSize","","The size of the dynamic table can never be allowed to exceed the max\nsize mandated to the decoder by the protocol. (by perfroming changes\nmade by SizeUpdate blocks).",3,null],[6,"DecoderResult","","The result returned by the `decode` method of the `Decoder`.",null,null],[11,"eq","","",1,null],[11,"clone","","",1,null],[11,"fmt","","",1,null],[11,"eq","","",2,null],[11,"ne","","",2,null],[11,"clone","","",2,null],[11,"fmt","","",2,null],[11,"eq","","",3,null],[11,"ne","","",3,null],[11,"clone","","",3,null],[11,"fmt","","",3,null],[11,"new","","Creates a new `Decoder` with all settings set to default values.",4,{"inputs":[],"output":{"name":"decoder"}}],[11,"set_max_table_size","","Sets a new maximum dynamic table size for the decoder.",4,null],[11,"decode_with_cb","","Decodes the headers found in the given buffer `buf`. Invokes the callback `cb` for each\ndecoded header in turn, by providing it the header name and value as `Cow` byte array\nslices.",4,null],[11,"decode","","Decode the header block found in the given buffer.",4,null],[0,"huffman","tokio_http2::hpack","A module exposing utilities for encoding and decoding Huffman-coded octet\nstrings, under the Huffman code defined by HPACK.\n(HPACK-draft-10, Appendix B)",null,null],[3,"HuffmanDecoder","tokio_http2::hpack::huffman","A simple implementation of a Huffman code decoder.",null,null],[4,"HuffmanDecoderError","","Represents the error variants that the `HuffmanDecoder` can return.",null,null],[13,"PaddingTooLarge","","Any padding strictly larger than 7 bits MUST be interpreted as an error",5,null],[13,"InvalidPadding","","Any padding that does not correspond to the most significant bits of\nEOS MUST be interpreted as an error.",5,null],[13,"EOSInString","","If EOS is ever found in the string, it causes an error.",5,null],[6,"HuffmanDecoderResult","","The type that represents the result of the `decode` method of the\n`HuffmanDecoder`.",null,null],[11,"eq","","",5,null],[11,"clone","","",5,null],[11,"fmt","","",5,null],[11,"new","","Constructs a new HuffmanDecoder with the default Huffman code table, as\ndefined in the HPACK-draft-10, Appendix B.",6,{"inputs":[],"output":{"name":"huffmandecoder"}}],[11,"decode","","Decodes the buffer `buf` into a newly allocated `Vec`.",6,null]],"paths":[[3,"Encoder"],[4,"IntegerDecodingError"],[4,"StringDecodingError"],[4,"DecoderError"],[3,"Decoder"],[4,"HuffmanDecoderError"],[3,"HuffmanDecoder"]]};
searchIndex["http2hpack"] = {"doc":"This library supplies the required modules to implement HTTP/2 which includes the HPACK header\ncompression that includes the Huffman encoding/decoding features.","items":[[0,"http2","http2hpack","This library module provides HTTP/2 parsing and buffer frames used for HTTP/2.",null,null],[0,"hpack","","This library module provides the required HPACK compression used for HTTP/2 headers.\nA module implementing HPACK functionality. Exposes a simple API for\nperforming the encoding and decoding of header sets, according to the\nHPACK spec.",null,null],[0,"encoder","http2hpack::hpack","Implements all functionality related to encoding header blocks using\nHPACK.",null,null],[3,"Encoder","http2hpack::hpack::encoder","Represents an HPACK encoder. Allows clients to encode arbitrary header sets\nand tracks the encoding context. That is, encoding subsequent header sets\nwill use the context built by previous encode calls.",null,null],[5,"encode_integer_into","","Encode an integer to the representation defined by HPACK, writing it into the provider\n`io::Write` instance. Also allows the caller to specify the leading bits of the first\noctet. Any bits that are already set within the last `prefix_size` bits will be cleared\nand overwritten by the integer&#39;s representation (in other words, only the first\n`8 - prefix_size` bits from the `leading_bits` octet are reflected in the first octet\nemitted by the function.",null,{"inputs":[{"name":"usize"},{"name":"u8"},{"name":"u8"},{"name":"w"}],"output":{"name":"result"}}],[5,"encode_integer","","Encode an integer to the representation defined by HPACK.",null,{"inputs":[{"name":"usize"},{"name":"u8"}],"output":{"name":"vec"}}],[11,"new","","Creates a new `Encoder` with a default static table, as defined by the\nHPACK spec (Appendix A).",0,{"inputs":[],"output":{"name":"encoder"}}],[11,"encode","","Encodes the given headers using the HPACK rules and returns a newly\nallocated `Vec` containing the bytes representing the encoded header\nset.",0,null],[11,"encode_into","","Encodes the given headers into the given `io::Write` instance. If the io::Write raises an\nError at any point, this error is propagated out. Any changes to the internal state of the\nencoder will not be rolled back, though, so care should be taken to ensure that the paired\ndecoder also ends up seeing the same state updates or that their pairing is cancelled.",0,null],[11,"encode_header_into","","Encodes a single given header into the given `io::Write` instance.",0,null],[0,"decoder","http2hpack::hpack","Exposes the struct `Decoder` that allows for HPACK-encoded header blocks to\nbe decoded into a header list.",null,null],[3,"Decoder","http2hpack::hpack::decoder","Decodes headers encoded using HPACK.",null,null],[4,"IntegerDecodingError","","Represents all errors that can be encountered while decoding an\ninteger.",null,null],[13,"TooManyOctets","","5.1. specifies that &quot;excessively large integer decodings&quot; MUST be\nconsidered an error (whether the size is the number of octets or\nvalue). This variant corresponds to the encoding containing too many\noctets.",1,null],[13,"ValueTooLarge","","The variant corresponds to the case where the value of the integer\nbeing decoded exceeds a certain threshold.",1,null],[13,"NotEnoughOctets","","When a buffer from which an integer was supposed to be encoded does\nnot contain enough octets to complete the decoding.",1,null],[13,"InvalidPrefix","","Only valid prefixes are [1, 8]",1,null],[4,"StringDecodingError","","Represents all errors that can be encountered while decoding an octet\nstring.",null,null],[13,"NotEnoughOctets","","",2,null],[13,"HuffmanDecoderError","","",2,null],[4,"DecoderError","","Represents all errors that can be encountered while performing the decoding\nof an HPACK header set.",null,null],[13,"HeaderIndexOutOfBounds","","",3,null],[13,"IntegerDecodingError","","",3,null],[13,"StringDecodingError","","",3,null],[13,"InvalidMaxDynamicSize","","The size of the dynamic table can never be allowed to exceed the max\nsize mandated to the decoder by the protocol. (by perfroming changes\nmade by SizeUpdate blocks).",3,null],[6,"DecoderResult","","The result returned by the `decode` method of the `Decoder`.",null,null],[11,"eq","","",1,null],[11,"clone","","",1,null],[11,"fmt","","",1,null],[11,"eq","","",2,null],[11,"ne","","",2,null],[11,"clone","","",2,null],[11,"fmt","","",2,null],[11,"eq","","",3,null],[11,"ne","","",3,null],[11,"clone","","",3,null],[11,"fmt","","",3,null],[11,"new","","Creates a new `Decoder` with all settings set to default values.",4,{"inputs":[],"output":{"name":"decoder"}}],[11,"set_max_table_size","","Sets a new maximum dynamic table size for the decoder.",4,null],[11,"decode_with_cb","","Decodes the headers found in the given buffer `buf`. Invokes the callback `cb` for each\ndecoded header in turn, by providing it the header name and value as `Cow` byte array\nslices.",4,null],[11,"decode","","Decode the header block found in the given buffer.",4,null],[0,"huffman","http2hpack::hpack","A module exposing utilities for encoding and decoding Huffman-coded octet\nstrings, under the Huffman code defined by HPACK.\n(HPACK-draft-10, Appendix B)",null,null],[3,"HuffmanDecoder","http2hpack::hpack::huffman","A simple implementation of a Huffman code decoder.",null,null],[4,"HuffmanDecoderError","","Represents the error variants that the `HuffmanDecoder` can return.",null,null],[13,"PaddingTooLarge","","Any padding strictly larger than 7 bits MUST be interpreted as an error",5,null],[13,"InvalidPadding","","Any padding that does not correspond to the most significant bits of\nEOS MUST be interpreted as an error.",5,null],[13,"EOSInString","","If EOS is ever found in the string, it causes an error.",5,null],[6,"HuffmanDecoderResult","","The type that represents the result of the `decode` method of the\n`HuffmanDecoder`.",null,null],[11,"eq","","",5,null],[11,"clone","","",5,null],[11,"fmt","","",5,null],[11,"new","","Constructs a new HuffmanDecoder with the default Huffman code table, as\ndefined in the HPACK-draft-10, Appendix B.",6,{"inputs":[],"output":{"name":"huffmandecoder"}}],[11,"decode","","Decodes the buffer `buf` into a newly allocated `Vec`.",6,null]],"paths":[[3,"Encoder"],[4,"IntegerDecodingError"],[4,"StringDecodingError"],[4,"DecoderError"],[3,"Decoder"],[4,"HuffmanDecoderError"],[3,"HuffmanDecoder"]]};
initSearch(searchIndex);
