JSON8 Pointer
=============

[![build status](https://img.shields.io/travis/JSON8/pointer.svg?style=flat-square)](https://travis-ci.org/JSON8/pointer)

JSON Pointer [RFC 6901](http://tools.ietf.org/html/rfc6901) implementation for JavaScript.

See also [JSON8 Patch](https://github.com/JSON8/patch) for more methods to work with JSON pointers.

* [Getting started](#getting-started)
* [Methods](#methods)
  * [find](#find)
  * [parse](#parse)
  * [serialize](#serialize)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

```npm install json8-pointer```

----

```javascript
var ooPointer = require('json8-pointer');
```

or

```xml
<script src="node_modules/json8-pointer/JSON8Pointer.js"></script>
```
```javascript
var ooPointer = window.JSON8Pointer
```

[↑](#json8-pointer)

# Methods

## find

Use a JSON Pointer to find a value in a JSON document.
Returns ```undefined``` if the value cannot be found.

```javascript
var doc = {"foo": {"bar": "foobar"}}

ooPointer.find(doc, '/foo/bar');
// "foobar"

ooPointer.find(doc, '/bar/foo');
// undefined
```

[↑](#json8-pointer)

## parse

Takes a JSON Pointer string and return an array of unescaped tokens.

```javascript
ooPointer.parse('/foo/bar/hello');
// ['foo', 'bar', 'hello'];

ooPointer.parse('/foo/a~1b')
// ['foo', 'a/b']
```

[↑](#json8-pointer)

## serialize

Takes an array of escaped tokens (see [parse](parse)) and return a JSON Pointer string.

 ```javascript
ooPointer.serialize(['foo', 'bar', 'hello']);
// '/foo/bar/hello'

ooPointer.serialize(['foo', 'a/b'])
// '/foo/a~1b'
```

[↑](#json8-pointer)

# Tests

```
npm install -g eslint mocha babel
npm test
```

[↑](#json8-pointer)

# Contributing

See [CONTRIBUTING.md](https://github.com/JSON8/merge-pointer/blob/master/CONTRIBUTING.md)

[↑](#json8-pointer)
