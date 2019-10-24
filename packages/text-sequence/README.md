# JSON8 Text Sequence

## Introduction

JSON Text Sequence [RFC 7464](https://tools.ietf.org/html/rfc7464) toolkit for JavaScript.

---

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [SerializeStream](#serializestream)
- [ParseStream](#parsestream)
- [Benchmark](#benchmark)

## Getting started

`npm install json8-text-sequence`

---

```js
const textSequence = require("json8-text-sequence");
```

## SerializeStream

```js
const { createWriteStream } = require("fs");
const textSequence = require("json8-text-sequence");

const writeStream = createWriteStream("example.log");
const serializeStream = new textSequence.SerializeStream();

serializeStream.pipe(writeStream);

for (let i = 0; i < 50; i++) {
  serializeStream.write([
    Math.random()
      .toString()
      .slice(2),
  ]);
}
```

[↑](#json8-text-sequence)

## ParseStream

```js
const { createReadStream } = require("fs");
const textSequence = require("json8-text-sequence");

const readStream = createReadStream("example.log");
const parseStream = new textSequence.ParseStream();

readStream.pipe(parseStream);

parseStream.on("data", json => {
  console.log(json);
});
```

## Benchmark

```sh
git clone git@github.com:sonnyp/JSON8.git
cd JSON8/packages/text-sequence
node benchmark
```

On my computer:

```
json-text-sequence x 73 ops/sec ±4.64% (74 runs sampled)
json8-text-sequence x 584 ops/sec ±5.81% (66 runs sampled)
Fastest is json8-text-sequence
```

[↑](#json8-text-sequence)
