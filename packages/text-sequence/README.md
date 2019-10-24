# JSON8 Text Sequence

## Introduction

JSON Text Sequence [RFC 7464](https://tools.ietf.org/html/rfc7464) toolkit for JavaScript.

---

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [SerializeStream](#serializestream)
- [ParseStream](#parsestream)

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

[↑](#json8-text-sequence)
