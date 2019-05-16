# JSON8 Pointer

## Introduction

JSON Pointer [RFC 6901](http://tools.ietf.org/html/rfc6901) toolkit for JavaScript.

See also [JSON8 Patch](https://github.com/sonnyp/JSON8/tree/master/packages/patch) for more methods to work with JSON pointers.

---

* [Introduction](#introduction)
* [Getting started](#getting-started)
* [Methods](#methods)
  * [find](#find)
  * [context](#context)
  * [encode](#encode)
  * [serialize](#serialize)
  * [escape](#escape)
  * [decode](#decode)
  * [parse](#parse)
  * [unescape](#unescape)
  * [join](#join)
  * [index](#index)
  * [dict](#dict)
  * [flatten](#flatten)
  * [unflatten](#unflatten)
  * [compile](#compile)

## Getting started

`npm install json8-pointer`

---

```javascript
const pointer = require("json8-pointer");
```

[↑](#json8-pointer)

## Methods

### find

Use a JSON Pointer to find a value in a JSON document.
Returns `undefined` if the value cannot be found.

```javascript
var doc = { foo: { bar: "foobar" } };

pointer.find(doc, "/foo/bar");
// "foobar"

pointer.find(doc, "/bar/foo");
// undefined
```

[↑](#json8-pointer)

### context

Returns the target parent and target property of a pointer.

```javascript
var doc = { foo: { bar: "foobar" } };

pointer.context(doc, "/foo/bar");
// ['bar', doc.foo]
```

[↑](#json8-pointer)

### encode

Takes an array of unescaped tokens (see [decode](#decode)) and return a JSON Pointer string.

```javascript
pointer.encode(["foo", "bar", "hello"]);
// '/foo/bar/hello'

pointer.encode(["foo", "a/b"]);
// '/foo/a~1b'
```

You can specify a different separator than the default `/`.

```javascript
pointer.encode(["foo", "bar", "hello"], ".");
// '.foo.bar.hello'
```

[↑](#json8-pointer)

### serialize

Alias for the [encode](#encode) method.

[↑](#json8-pointer)

### escape

Escape a single token for use in JSON Pointer.

```javascript
pointer.escape("a/b");
// 'a~1b'
```

You can specify a different separator than the default `/`.

```javascript
pointer.escape("a.b", ".");
// 'a~1b'
```

[↑](#json8-pointer)

### decode

Takes a JSON Pointer string and return an array of unescaped tokens.

```javascript
pointer.decode("/foo/bar/hello");
// ['foo', 'bar', 'hello'];

pointer.decode("/foo/a~1b");
// ['foo', 'a/b']
```

You can specify a different separator than the default `/`.

```javascript
pointer.decode(".foo.bar.hello", ".");
// ['foo', 'bar', 'hello'];
```

[↑](#json8-pointer)

### parse

Alias for the [decode](#decode) method.

[↑](#json8-pointer)

### unescape

Unescape a single token see [escape](#escape).

```javascript
pointer.unescape("a~1b");
// 'a/b'
```

You can specify a different separator than the default `/`.

```javascript
pointer.unescape("a~1b", ".");
// 'a/b'
```

[↑](#json8-pointer)

### join

Join a base pointer and tokens;

```javascript
pointer.join("/foo", ["bar"]);
pointer.join(["foo"], "bar");
pointer.join("", ["foo", "bar"]);
pointer.join([], ["foo", "bar"]);
// `/foo/bar`
```

You can specify a different separator than the default `/`.

```javascript
pointer.join("/foo", ["bar"], ".");
// `.foo.bar`
```

[↑](#json8-pointer)

### index

[demo/playground](https://json8.github.io/pointer/demos/index/)

The `index` method returns an object with all values indexed by pointers.

```javascript
pointer.index("foo"); // {'': 'foo'}

pointer.index(["hello", "earth"]);
//  {
//    '': ['hello', 'earth'],
//    '/0': 'hello',
//    '/1': 'earth'
//  }
```

[↑](#json8-pointer)

### dict

[demo/playground](https://json8.github.io/pointer/demos/index/)

Just like [index](#index) but only indexes primitives.

```javascript
pointer.dict(['hello', 'earth'])
//  {
//    '/0': 'hello',
//    '/1': 'earth'
//  }

pointer.dict({'foo', 'bar'})
//  {
//    '/foo': 'bar'
//  }
```

[↑](#json8-pointer)

### flatten

[demo/playground](https://json8.github.io/pointer/demos/flatten/)

The `flatten` method works like a flat version of [index](#index).

```javascript
pointer.flatten(["hello", "earth"]);
//  {
//    '': [],
//    '/0': 'hello',
//    '/1': 'earth'
//  }
```

[↑](#json8-pointer)

### unflatten

[demo/playground](https://json8.github.io/pointer/demos/flatten/)

The `unflatten` method takes an [flattened](#flatten) object and returns a deep JSON document.

```javascript
pointer.unflatten({ "": "foo" }); // 'foo'

pointer.unflatten({
  "": [],
  "/0": "hello",
  "/1": "earth",
}); // ['hello', 'earth']
```

### compile

The `compile` method takes a pointer and returns a function that accept a document and returns the value at the location of the pointer.

```javascript
const getAge = pointer.compile("/age");

getAge({ age: 22 }); // 22
```

[↑](#json8-pointer)
