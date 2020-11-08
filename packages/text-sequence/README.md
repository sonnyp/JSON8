# JSON8 Text Sequence

## Introduction

JSON Text Sequence [RFC 7464](https://tools.ietf.org/html/rfc7464) toolkit for JavaScript.

---

- [JSON8 Text Sequence](#json8-text-sequence)
  - [Introduction](#introduction)
  - [Install](#install)
  - [serialize](#serialize)
  - [parse](#parse)
  - [Web Stream](#web-stream)
    - [SerializeTransformer](#serializetransformer)
    - [ParseTransformer](#parsetransformer)
  - [Node.js Stream](#nodejs-stream)
    - [SerializeStream](#serializestream)
    - [ParseStream](#parsestream)
  - [Parser](#parser)
  - [Benchmark](#benchmark)

## Install

`npm install json8-text-sequence`

---

```js
const textSequence = require("json8-text-sequence");
```

[↑](#json8-text-sequence)

## serialize

Takes a JSON value and returns a text sequence.

```js
const { serialize } = require("json8-text-sequence");

serialize("hello"); // '\x1e"hello"\x0A'
serialize(true); // "\x1etrue\x0A"
serialize(false); // "\x1efalse\x0A"
serialize(null); // "\x1enull\x0A"
serialize(0); //  "\x1e0\x0A"
serialize(-1); // "\x1e-1\x0A"
serialize(1); // "\x1e1\x0A"
serialize({}); // "\x1e{}\x0A"
serialize([]); // "\x1e[]\x0A"

// serialize an array of JSON values
["hello", "there"].map(serialize).join("");
```

[↑](#json8-text-sequence)

## parse

Takes a string and returns an iterator.

```js
const { parse } = require("json8-text-sequence");

const str = '\x1e"hello"\x0A\x1e"hello';

// type can be "truncated", "invalid" or "sequence"
for (const [type, value] of parse(str)) {
  console.log(type, value);
}

// get an array of sequences
console.log(
  Array.from(parse(str))
    .filter(([type]) => type === "sequence")
    .map(([, value]) => value)
);
```

[↑](#json8-text-sequence)

## Web Stream

### SerializeTransformer

A [Transformer](https://streams.spec.whatwg.org/#ts-model) that takes JSON values and outputs text sequence strings.

To be used with a `TransformStream`.

```js
const SerializeTransformer = require("json8-text-sequence/lib/SerializeTransformer");

const transform = new TransformStream(new SerializeTransformer());

readable.pipeThrough(transform).pipeTo(writable);
```

[↑](#json8-text-sequence)

### ParseTransformer

A [Transformer](https://streams.spec.whatwg.org/#ts-model) that takes strings and outputs JSON values.

To be used with a `TransformStream`.

```js
function render() {
  return new WritableStream({
    write(seq) {
      const p = document.createElement("p");
      p.textContent = seq.version;
      document.body.appendChild(p);
    },
  });
}

(async () => {
  const res = await fetch(
    "https://raw.githubusercontent.com/sonnyp/JSON8/master/packages/text-sequence/benchmark/data.jts"
  );

  const transformer = new ParseTransformer();
  transformer.oninvalid = (seq, controller) => {
    console.log("invalid sequence", seq);
  };
  transformer.ontruncated = (seq, controller) => {
    console.log("truncated sequence", seq);
  };

  res.body
    // You might need a polyfill for TextDecoderStream
    // https://github.com/GoogleChromeLabs/text-encode-transform-polyfill
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(transformer))
    .pipeTo(logStream());
})().catch(console.error);
```

[↑](#json8-text-sequence)

## Node.js Stream

### SerializeStream

A [Node.js Transform stream](https://nodejs.org/api/stream.html#stream_class_stream_transform) that takes JSON values and outputs text sequence strings.

```js
const { createWriteStream } = require("fs");
const textSequence = require("json8-text-sequence");

const writeStream = createWriteStream("example.log", { flags: "a" });
const serializeStream = new textSequence.SerializeStream();

serializeStream.pipe(writeStream);

setInterval(() => {
  // sequence can be any valid JSON value
  // string, boolean, array, object, ...
  const sequence = {
    date: Date.now(),
    value: Math.random().toString().slice(2),
  };
  serializeStream.write(sequence);
}, 500);
```

[↑](#json8-text-sequence)

### ParseStream

A [Node.js Transform stream](https://nodejs.org/api/stream.html#stream_class_stream_transform) that takes strings (or [Buffer](https://nodejs.org/api/buffer.html) or anything with a `toString` method) and outputs JSON values.

```js
const { createReadStream } = require("fs");
const textSequence = require("json8-text-sequence");

const readStream = createReadStream("example.log");
const parseStream = new textSequence.ParseStream();

readStream.pipe(parseStream);

// Sequence is truncated
parseStream.on("truncated", (sequence) => {
  console.log("truncated sequence", sequence);
});

// Sequence is not valid JSON
parseStream.on("invalid", (sequence) => {
  console.log("invalid sequence", sequence);
});

parseStream.on("data", (json) => {
  console.log(json);
});
```

[↑](#json8-text-sequence)

## Parser

Takes strings or anything with a `toString` method and produces JSON values.

Useful to build your own async transformer but consider using [ParseStream](#ParseStream) for Node.js or [ParseTransformer](#ParseTransformer) for the Web/deno.

```js
const { Parser } = require("json8-text-sequence");

const parser = new Parser();

// type can be "truncated", "invalid" or "sequence"
parser.onvalue = (type, value) {
  console.log(type, value)
}

parser.onend = () {
  console.log('end')
}

parser.write('\x1e"hello"\x0A\x1e"hello')
parser.end()
```

[↑](#json8-text-sequence)

## Benchmark

```sh
git clone git@github.com:sonnyp/JSON8.git
yarn
cd JSON8/packages/text-sequence
node benchmark
```

<table>
  <tr>
    <td>json-text-sequence</td>
    <td><strong>json8-text-sequence</strong></td>
  </tr>
  <tr>
    <td>81 ops/sec</td>
    <td><strong>735 ops/sec</strong></td>
  </tr>
</table>

Read and parse a 900K application/json-seq stream from disk

AMD Ryzen 5 3600

[↑](#json8-text-sequence)
