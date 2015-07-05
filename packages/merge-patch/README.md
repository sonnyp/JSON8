JSON8 Merge Patch
=================

[![build status](https://img.shields.io/travis/JSON8/merge-patch.svg?style=flat-square)](https://travis-ci.org/JSON8/merge-patch)

Implementation of JSON Merge Patch [RFC 7396](https://tools.ietf.org/html/rfc7396)

* [Getting started](#getting-started)
* [Methods](#methods)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

```npm install json8-merge-patch```

```javascript
var mergePatch = require('json8-merge-patch');
```

or

```xml
<script src="node_modules/json8-merge-patch/JSON8MergePatch.js"></script>
```
```javascript
var mergePatch = window.JSON8MergePatch
```

[↑](#json8-merge-patch)

# Methods

## apply

Apply a JSON Merge Patch on a JSON document.

```javascript
doc = mergePatch.apply(doc, {"name": "Jeanette doe"});
```

[↑](#json8-merge-patch)

## patch

Alias for [apply](#apply) method.

[↑](#json8-merge-patch)

## toJSONPatch

This method is only available if the optional dependency [JSON8 Pointer](https://github.com/JSON8/pointer) is installed.

```npm install json8-pointer```

```javascript
var JSONMergePatch = {
  "foo": {"bar": "foobar"},
  "foo": null}
}
var JSONPatch = mergePatch.toJSONPatch(JSONMergePatch)
//[
//  { op: 'add', path: '/foo/bar', value: 'foobar' },
//  { op: 'delete', path: '/bar' }
//]
```

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
