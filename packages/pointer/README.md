JSON8 Pointer
=============

[![build status](https://img.shields.io/travis/JSON8/pointer.svg?style=flat-square)](https://travis-ci.org/JSON8/pointer/branches)

JSON Pointer [RFC 6901](http://tools.ietf.org/html/rfc6901) implementation for JavaScript.

See also [JSON8 Patch](https://github.com/JSON8/patch) for more methods to work with JSON pointers.

* [Getting started](#getting-started)
* [Methods](#methods)
  * [find](#find)
  * [decode](#decode)
  * [parse](#parse)
  * [encode](#encode)
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

## decode

Takes a JSON Pointer string and return an array of unescaped tokens.

```javascript
ooPointer.decode('/foo/bar/hello');
// ['foo', 'bar', 'hello'];

ooPointer.decode('/foo/a~1b')
// ['foo', 'a/b']
```

You can specify a different separator than the default ```/```.

```javascript
ooPointer.decode('.foo.bar.hello', '.');
// ['foo', 'bar', 'hello'];
```

[↑](#json8-pointer)

## parse

Alias for the [decode](#decode) method.

[↑](#json8-pointer)

## encode

Takes an array of escaped tokens (see [parse](parse)) and return a JSON Pointer string.

 ```javascript
ooPointer.encode(['foo', 'bar', 'hello']);
// '/foo/bar/hello'

ooPointer.encode(['foo', 'a/b'])
// '/foo/a~1b'
```

You can specify a different separator than the default ```/```.

```javascript
ooPointer.encode(['foo', 'bar', 'hello'], '.');
// '.foo.bar.hello'
```

[↑](#json8-pointer)

## serialize

Alias for the [encode](#encode) method.

[↑](#json8-pointer)

# Tests

```
npm install -g mocha browserify
npm test
```

[↑](#json8-pointer)

# Contributing

See [CONTRIBUTING.md](https://github.com/JSON8/merge-pointer/blob/master/CONTRIBUTING.md)

[↑](#json8-pointer)
