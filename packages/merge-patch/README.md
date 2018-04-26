# JSON8 Merge Patch

## Introduction

JSON Merge Patch [RFC 7396](https://tools.ietf.org/html/rfc7396) toolkit for JavaScript.

---

* [Introduction](#introduction)
* [Getting started](#getting-started)
* [Methods](#methods)
  * [apply](#apply)
  * [patch](#patch)
  * [diff](#diff)
  * [toJSONPatch](#tojsonpatch)

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

* May mutates the target document, if you wish to pass a shallow copy use [JSON8 clone](https://github.com/sonnyp/JSON8/tree/master/packages/json8#ooclone).
* Does not validate the patch nor the target nor the result for JSON correctness, use [JSON8 valid](https://github.com/sonnyp/JSON8/tree/master/packages/json8#oovalid).

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

## toJSONPatch

JSON Patch is a more capable alternative to JSON Merge Patch.
To work with JSON Patch see [JSON8 Patch](https://github.com/sonnyp/JSON8/tree/master/packages/patch).

This method converts a JSON Merge Patch to a JSON Patch and is only available if the optional dependency [JSON8 Pointer](https://github.com/sonnyp/JSON8/tree/master/packages/pointer) is available.

Does not validate the merge patch nor the patch for JSON correctness, use [JSON8 valid](https://github.com/sonnyp/JSON8/tree/master/packages/json8#oovalid).

`npm install json8-pointer`

---

```javascript
const JSONMergePatch = {
  "foo": {"bar": "foobar"},
  "bar": null}
}
const JSONPatch = mergePatch.toJSONPatch(JSONMergePatch)
/*
[
  { op: 'add', path: '/foo/bar', value: 'foobar' },
  { op: 'remove', path: '/bar' }
]
*/
```

Per specification a JSON Merge Patch that would successfully apply on a document might fail to apply once converted to a JSON Patch.

There are 3 cases:

Incompatible destination

```javascript
const doc = [];
const JSONMergePatch = { a: "hello" };
const JSONPatch = toJSONPatch(JSONMergePatch);
// JSONPatch will fail to apply because doc is not an object
```

Wrong location

```javascript
const doc = {};
const JSONMergePatch = { a: { b: "hello" } };
const JSONPatch = toJSONPatch(JSONMergePatch);
// JSONPatch will fail to apply because doc.a doesn't exist
```

Remove non-existant value

```javascript
const doc = {};
const JSONMergePatch = { a: null };
const JSONPatch = toJSONPatch(JSONMergePatch);
// JSONPatch will fail to apply because doc.a doesn't exist
```

I might add an option to the toJSONPatch method later to produce a successful JSON Patch but the only way to do this is to pass the document as well. Let me know if there is any interest or [contribute](https://github.com/sonnyp/JSON8/blob/master/CONTRIBUTING.md).

[↑](#json8-merge-patch)
