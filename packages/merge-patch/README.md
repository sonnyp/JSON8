JSON8 Merge Patch
=================

[![build status](https://img.shields.io/travis/JSON8/merge-patch.svg?style=flat-square)](https://travis-ci.org/JSON8/merge-patch)

JSON Merge Patch [RFC 7396](https://tools.ietf.org/html/rfc7396) implementation for JavaScript.

* [Getting started](#getting-started)
* [Methods](#methods)
  * [apply](#apply)
  * [patch](#patch)
  * [toJSONPatch](#tojsonpatch)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

```npm install json8-merge-patch```

----

```javascript
var ooPatch = require('json8-merge-patch');
```

or

```xml
<script src="node_modules/json8-merge-patch/JSON8MergePatch.js"></script>
```
```javascript
var ooPatch = window.JSON8MergePatch
```

[↑](#json8-merge-patch)

# Methods

## apply

Apply a JSON Merge Patch on a JSON document.

```javascript
doc = ooPatch.apply(doc, {"name": "Jeanette doe"});
```

[↑](#json8-merge-patch)

## patch

Alias for [apply](#apply) method.

[↑](#json8-merge-patch)

## toJSONPatch

To work with JSON Patch see [JSON8 Patch](https://github.com/JSON8/patch).

This method is only available if the optional dependency [JSON8 Pointer](https://github.com/JSON8/pointer) is installed.

```npm install json8-pointer```

```javascript
var JSONMergePatch = {
  "foo": {"bar": "foobar"},
  "foo": null}
}
var JSONPatch = ooPatch.toJSONPatch(JSONMergePatch)
//[
//  { op: 'add', path: '/foo/bar', value: 'foobar' },
//  { op: 'remove', path: '/bar' }
//]
```

Be aware that per specification a JSON Merge Patch that would succefully apply on a document might fail to apply once converted to a JSON Patch.

There are 3 cases:

Incompatible destination

```javascript

var doc = []
var JSONMergeatch = {a: 'hello'}
var JSONPatch = toJSONPatch(JSONMergePatch)
// JSONPatch will fail to apply because doc is not an object
```

Wrong location

```javascript

var doc = {}
var JSONMergeatch = {a: {b: 'hello'}}
var JSONPatch = toJSONPatch(JSONMergePatch)
// JSONPatch will fail to apply because doc.a doesn't exist
```

Remove non-existant value

```javascript

var doc = {}
var JSONMergeatch = {a: null}
var JSONPatch = toJSONPatch(JSONMergePatch)
// JSONPatch will fail to apply because doc.a doesn't exist
```

I might add an option to the toJSONPatch method later to produce a succeful JSON Patch but the only way to do this is to pass the document as well. Let me know if there is any interest or [contribute](https://github.com/JSON8/merge-patch/blob/master/CONTRIBUTING.md).

[↑](#json8-merge-patch)

# Tests

```
npm install -g eslint mocha babel
npm test
```

[↑](#json8-merge-patch)

# Contributing

See [CONTRIBUTING.md](https://github.com/JSON8/merge-patch/blob/master/CONTRIBUTING.md)

[↑](#json8-merge-patch)
