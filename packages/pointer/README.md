JSON8 Pointer
=============

[![build status](https://img.shields.io/travis/JSON8/pointer.svg?style=flat-square)](https://travis-ci.org/JSON8/pointer/branches)

JSON Pointer [RFC 6901](http://tools.ietf.org/html/rfc6901) implementation for JavaScript.

See also [JSON8 Patch](https://github.com/JSON8/patch) for more methods to work with JSON pointers.

* [Getting started](#getting-started)
* [Methods](#methods)
  * [find](#find)
  * [encode](#encode)
  * [serialize](#serialize)
  * [escape](#escape)
  * [decode](#decode)
  * [parse](#parse)
  * [unescape](#unescape)
  * [context](#context)
  * [join](#join)
  * [index](#index)
  * [dict](#dict)
  * [flatten](#flatten)
  * [unflatten](#unflatten)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

`npm install json8-pointer`

----

```javascript
var pointer = require('json8-pointer');
```

or

```xml
<script src="node_modules/json8-pointer/JSON8Pointer.js"></script>
```
```javascript
var pointer = window.JSON8Pointer
```

[↑](#json8-pointer)

# Methods

## find

Use a JSON Pointer to find a value in a JSON document.
Returns ```undefined``` if the value cannot be found.

```javascript
var doc = {"foo": {"bar": "foobar"}}

pointer.find(doc, '/foo/bar');
// "foobar"

pointer.find(doc, '/bar/foo');
// undefined
```

[↑](#json8-pointer)

## context

Returns the target parent and target property of a pointer.

```javascript
var doc = {"foo": {"bar": "foobar"}}

pointer.context(doc, '/foo/bar');
// ['bar', doc.foo]
```

[↑](#json8-pointer)

## encode

Takes an array of unescaped tokens (see [decode](#decode)) and return a JSON Pointer string.

 ```javascript
pointer.encode(['foo', 'bar', 'hello']);
// '/foo/bar/hello'

pointer.encode(['foo', 'a/b'])
// '/foo/a~1b'
```

You can specify a different separator than the default `/`.

```javascript
pointer.encode(['foo', 'bar', 'hello'], '.');
// '.foo.bar.hello'
```

[↑](#json8-pointer)

## serialize

Alias for the [encode](#encode) method.

[↑](#json8-pointer)

## escape

Escape a single token for use in JSON Pointer.

```javascript
pointer.escape('a/b')
// 'a~1b'
```

You can specify a different separator than the default `/`.

```javascript
pointer.escape('a.b', '.')
// 'a~1b'
```

[↑](#json8-pointer)

## decode

Takes a JSON Pointer string and return an array of unescaped tokens.

```javascript
pointer.decode('/foo/bar/hello');
// ['foo', 'bar', 'hello'];

pointer.decode('/foo/a~1b')
// ['foo', 'a/b']
```

You can specify a different separator than the default `/`.

```javascript
pointer.decode('.foo.bar.hello', '.');
// ['foo', 'bar', 'hello'];
```

[↑](#json8-pointer)

## parse

Alias for the [decode](#decode) method.

[↑](#json8-pointer)

## unescape

Unescape a single token see [escape](#escape).

```javascript
pointer.unescape('a~1b')
// 'a/b'
```

You can specify a different separator than the default `/`.

```javascript
pointer.unescape('a~1b', '.')
// 'a/b'
```

[↑](#json8-pointer)

## join

Join a base pointer and tokens;

```javascript
pointer.join('/foo', ['bar'])
pointer.join(['foo'], 'bar')
pointer.join('', ['foo', 'bar'])
pointer.join([], ['foo', 'bar'])
// `/foo/bar`
```

You can specify a different separator than the default `/`.

```javascript
pointer.join('/foo', ['bar'], '.')
// `.foo.bar`
```

[↑](#json8-pointer)

## index

[demo/playground](https://json8.github.io/pointer/demos/index/)

The `index` method returns an object with all values indexed by pointers.

```javascript
pointer.index('foo') // {'': 'foo'}

pointer.index(['hello', 'earth'])
//  {
//    '': ['hello', 'earth'],
//    '/0': 'hello',
//    '/1': 'earth'
//  }
```

[↑](#json8-pointer)

## dict

[demo/playground](https://json8.github.io/pointer/demos/index/)

Just like (index)[#index] but only indexes primitives.

```javascript
pointer.index(['hello', 'earth'])
//  {
//    '/0': 'hello',
//    '/1': 'earth'
//  }

pointer.index({'foo', 'bar'})
//  {
//    '/foo': 'bar'
//  }
```

[↑](#json8-pointer)

## flatten

[demo/playground](https://json8.github.io/pointer/demos/flatten/)

The `flatten` method works like a flat version of [index](#index).

```javascript
pointer.flatten(['hello', 'earth'])
//  {
//    '': [],
//    '/0': 'hello',
//    '/1': 'earth'
//  }
```

[↑](#json8-pointer)

## unflatten

[demo/playground](https://json8.github.io/pointer/demos/flatten/)

The `unflatten` method takes an [flattened](#flatten) object and returns a deep JSON document.

```javascript
pointer.unflatten({'': 'foo'}) // 'foo'

pointer.unflatten({
  '': [],
  '/0': 'hello',
  '/1': 'earth'
}) // ['hello', 'earth']
```

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
