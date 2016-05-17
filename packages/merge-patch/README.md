JSON8 Merge Patch
=================

[![build status](https://img.shields.io/travis/JSON8/merge-patch.svg?style=flat-square)](https://travis-ci.org/JSON8/merge-patch)

# Introduction

JSON Merge Patch [RFC 7396](https://tools.ietf.org/html/rfc7396) implementation for JavaScript.

See also

* [JSON8](https://github.com/JSON8/JSON8) to work with JSON
* [JSON8 Patch](https://github.com/JSON8/patch) for more capable JSON diffing and patching
* [JSON8 Pointer](https://github.com/JSON8/pointer) for JSON Pointer (URL for JSON) implementation

----

* [Introduction](#introduction)
* [Getting started](#getting-started)
* [Methods](#methods)
  * [apply](#apply)
  * [patch](#patch)
  * [diff](#diff)
  * [toJSONPatch](#tojsonpatch)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

```npm install json8-merge-patch```

----

```javascript
var ooMergePatch = require('json8-merge-patch');
```

or

```xml
<script src="node_modules/json8-merge-patch/JSON8MergePatch.js"></script>
```
```javascript
var ooMergePatch = window.JSON8MergePatch
```

[↑](#json8-merge-patch)

# Methods

## apply

Apply a JSON Merge Patch to a JSON document.

* May mutates the target document, if you wish to pass a shallow copy use [JSON8 clone](https://github.com/JSON8/JSON8#ooclone).
* Does not validate the patch nor the target nor the result for JSON validness, use [JSON8 valid](https://github.com/JSON8/JSON8#valid).

```javascript
doc = ooMergePatch.apply(doc, mergePatch);
```

```javascript
var person = {
  "name": "John Doe",
  "friendly": true,
  "age": 18,
  "address": {
    "country": "France"
  }
}

var mergePatch = {
  "age": 19,
  "friendly": "maybe"
  "address": {
    "country": null
  }
}

person = ooMergePatch.apply(person, mergePatch)
//{
//  "name": "John Doe",
//  "friendly": "maybe",
//  "age": 19,
//  "address": {}
//}
```


[↑](#json8-merge-patch)

## patch

Alias for [apply](#apply) method.

[↑](#json8-merge-patch)

## diff

Compares two JSON documents and returns a JSON Merge Patch diff.

```javascript
var a = {"foo": "bar", "bar": "foo"}
var b = {"foo": "foo"}

ooMergePatch.diff(a, b)
//{
//  "foo": "foo",
//  "bar": null
// }
```

[↑](#json8-merge-patch)

## toJSONPatch

JSON Patch is a more capable alternative to JSON Merge Patch.
To work with JSON Patch see [JSON8 Patch](https://github.com/JSON8/patch).

This method converts a JSON Merge Patch to a JSON Patch and is only available if the optional dependency [JSON8 Pointer](https://github.com/JSON8/pointer) is available.

Does not validate the merge patch nor the patch for JSON validness, use [JSON8 valid](https://github.com/JSON8/JSON8#valid).

```javascript
var JSONMergePatch = {
  "foo": {"bar": "foobar"},
  "foo": null}
}
var JSONPatch = ooMergePatch.toJSONPatch(JSONMergePatch)
//[
//  { op: 'add', path: '/foo/bar', value: 'foobar' },
//  { op: 'remove', path: '/bar' }
//]
```

Per specification a JSON Merge Patch that would successfully apply on a document might fail to apply once converted to a JSON Patch.

There are 3 cases:

Incompatible destination

```javascript

var doc = []
var JSONMergePatch = {a: 'hello'}
var JSONPatch = toJSONPatch(JSONMergePatch)
// JSONPatch will fail to apply because doc is not an object
```

Wrong location

```javascript

var doc = {}
var JSONMergePatch = {a: {b: 'hello'}}
var JSONPatch = toJSONPatch(JSONMergePatch)
// JSONPatch will fail to apply because doc.a doesn't exist
```

Remove non-existant value

```javascript

var doc = {}
var JSONMergePatch = {a: null}
var JSONPatch = toJSONPatch(JSONMergePatch)
// JSONPatch will fail to apply because doc.a doesn't exist
```

I might add an option to the toJSONPatch method later to produce a successful JSON Patch but the only way to do this is to pass the document as well. Let me know if there is any interest or [contribute](https://github.com/JSON8/merge-patch/blob/master/CONTRIBUTING.md).

[↑](#json8-merge-patch)

# Tests

```
npm install mocha browserify
npm test
```

[↑](#json8-merge-patch)

# Contributing

See [CONTRIBUTING.md](https://github.com/JSON8/merge-patch/blob/master/CONTRIBUTING.md)

[↑](#json8-merge-patch)
