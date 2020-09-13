# JSON8 Merge Patch

## Introduction

JSON Merge Patch [RFC 7396](https://tools.ietf.org/html/rfc7396) toolkit for JavaScript.

---

- [Introduction](#introduction)
- [Getting started](#getting-started)
- [Methods](#methods)
  - [apply](#apply)
  - [patch](#patch)
  - [diff](#diff)

## Getting started

`npm install json8-merge-patch`

---

```javascript
const mergePatch = require("json8-merge-patch");
```

[↑](#json8-merge-patch)

## Methods

### apply

Apply a JSON Merge Patch to a JSON document.

- May mutates the target document, if you wish to pass a shallow copy use [JSON8 clone](https://github.com/sonnyp/JSON8/tree/master/packages/json8#ooclone).
- Does not validate the patch nor the target nor the result for JSON correctness, use [JSON8 valid](https://github.com/sonnyp/JSON8/tree/master/packages/json8#oovalid).

```javascript
doc = mergePatch.apply(doc, mergePatch);
```

```javascript
let person = {
  "name": "John Doe",
  "friendly": true,
  "age": 18,
  "address": {
    "country": "France"
  }
}

const patch = {
  "age": 19,
  "friendly": "maybe"
  "address": {
    "country": null
  }
}

person = mergePatch.apply(person, patch)
/*
{
  "name": "John Doe",
  "friendly": "maybe",
  "age": 19,
  "address": {}
}
*/
```

[↑](#json8-merge-patch)

### object creation

When needed, `apply` creates objects with `null` prototype, you can choose the prototype to use with `{proto: Object}` as a third argument.

[↑](#json8-merge-patch)

### prototype pollution

`apply` will throw with an error if [prototype pollution](https://github.com/HoLyVieR/prototype-pollution-nsec18) is attempted. You can allow for prototype pollution by passing `{pollute: true}` as a third argument.

[↑](#json8-merge-patch)

### patch

Alias for [apply](#apply) method.

[↑](#json8-merge-patch)

### diff

Compares two JSON documents and returns a JSON Merge Patch.

```javascript
const a = { foo: "bar", bar: "foo" };
const b = { foo: "foo" };

mergePatch.diff(a, b);
/*
{
  "foo": "foo",
  "bar": null
}
*/
```

[↑](#json8-merge-patch)
