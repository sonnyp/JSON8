JSON8
=====

[![build status](https://img.shields.io/travis/JSON8/JSON8.svg?style=flat-square)](https://travis-ci.org/JSON8/JSON8)

# Introduction

JSON8 is a JavaScript library that makes working with JSON/data/structures safer and easier.

Features

* Strong JSON and type validation
* Full support for [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
* Support Node.js/io.js and browsers; [es5-shim](https://github.com/es-shims/es5-shim) for < IE 9, [JSON polyfill](https://bestiejs.github.io/json3/) for < IE 8
* See [Methods](#methods) and [Motivations](#motivations)
* [Tested](https://travis-ci.org/JSON8/JSON8)
* Small, no dependencies
* Modular, save bandwith/memory by requiring needed methods using ```require('json8/lib/METHOD_NAME')```

See also

* [mole](https://github.com/sonnyp/mole) to work with Array/Map/Object/Set data structures.
* [JSON8 Patch](https://github.com/JSON8/patch) for JSON diffing and patching
* [JSON8 Pointer](https://github.com/JSON8/pointer) for JSON Pointer (URL for JSON) implementation
* [JSON8 Merge Patch](https://github.com/JSON8/merge-patch) for simpler JSON object diffing/patching alternative to JSON Patch and Pointer

----


* [Introduction](#introduction)
* [Getting started](#getting-started)
* [Methods](#methods)
  * [clone](#clone)
  * [equal](#equal)
  * [type](#type)
  * [is](#is)
    - [structure](#structure)
    - [primitive](#primitive)
    - [object](#object)
    - [array](#array)
    - [number](#number)
    - [string](#string)
    - [boolean](#boolean)
    - [null](#null)
    - [JSON](#json)
  * [valid](#valid)
  * [serialize](#serialize)
  * [parse](#parse)
* [Motivations](#motivations)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

```npm install json8```

----

```javascript
var oo = require('json8');
```

or

```xml
<script src="node_modules/json8/JSON8.js"></script>
```
```javascript
var oo = window.JSON8
```

[↑](#json8)

# Methods

## clone

Deep clone any value.

```javascript
var doc = {"foo": "bar"}
var clone = oo.clone(doc) // {"foo":"bar"}
doc === copy        // false
oo.equal(doc, copy) // true

oo.clone(true) // true
oo.clone(42)   // 42
oo.clone(-0)   // -0
```

[↑](#json8)

## equal

Test for equality between two documents.

```javascript
oo.equal(true, true)     // true
oo.equal([], [])         // true
oo.equal({}, {})         // true
oo.equal(
  {foo: 'bar', bar: 'foo'}
  {bar: 'foo', foo: 'bar'}
)                        // true
oo.equal(new Set([1, 2]), new Set([1, 2])) // true
oo.equal(new Set([2, 1]), new Set([1, 2])) // false

oo.equal(new Set(), []) // true
oo.equal(new Map(), {}) // true

oo.equal([1, 2], [2, 1]) // false

oo.equal(-0, +0) // false
```

[↑](#json8)

## type

Returns the JSON type for a value, ```undefined``` if the value is not of any JSON type.

```javascript
oo.type({})        // 'object'
oo.type(new Map()) // 'object'
oo.type([])        // 'array'
oo.type(new Set()) // 'array'
oo.type(42)        // 'number'
oo.type('foo')     // 'string'
oo.type(null)      // 'null'
oo.type(true)      // 'boolean'

oo.type(undefined)      // undefined
oo.type(Infinity)       // undefined
oo.type(-Infinity)      // undefined
oo.type(NaN)            // undefined
oo.type(Symbol())       // undefined
oo.type(function() {})  // undefined
```

[↑](#json8)

## is

For each type you can use the syntax

```javascript
oo.is('foo', type)
```

or

```javascript
oo.isType('foo')
```

Where type is any of:

* [structure](#structure)
* [primitive](#primitive)
* [object](#object)
* [array](#array)
* [number](#number)
* [string](#string)
* [boolean](#boolean)
* [null](#null)
* [JSON](#json)

#### structure

Returns true for arrays and objects, false otherwise.

```javascript
oo.is({}, 'structure')    // true
oo.isStructure([])        // true
oo.isStructure(new Set()) // true
oo.isStructure(new Map()) // true

oo.isStructure(null)   // false
```

[↑](#json8)

#### primitive

Returns true for primitives, false otherwise.
Primitives are: number, boolean, null, string.

```javascript
oo.is(null, 'primitive') // true
oo.isPrimitive(true)     // true
oo.isPrimitive('foo')    // true
oo.isPrimitive(42)       // true

oo.isPrimitive([]])      // false
oo.isPrimitive({})       // false
oo.isPrimitive(Infinity) // false
oo.isPrimitive(NaN)      // false
```

[↑](#json8)

#### object

Returns true for object, false otherwise.

```javascript
oo.is({}, 'object')        // true
oo.isObject({})            // true
oo.isObject(new Map())     // true

oo.isObject([])            // false
oo.isObject(null)          // false
oo.isObject(function() {}) // false
oo.isObject(new Set())     // false
```

[↑](#json8)

#### array

Returns true for array, false otherwise.

```javascript
oo.is([], 'array')    // true
oo.isArray([])        // true
oo.isArray(new Set()) // true

oo.isArray({})        // false
oo.isArray(new Map()) // false
```

[↑](#json8)

#### number

Returns true for number, false otherwise.

```javascript
oo.is(42, 'number')    // true
oo.isNumber(4.2)       // true
oo.isNumber(-42)       // true

oo.isNumber(Infinity)  // false
oo.isNumber(-Infinity) // false
oo.isNumber(NaN)       // false
```

[↑](#json8)

#### string

Returns true for string, false otherwise.

```javascript
oo.is('foo', 'string') // true
oo.isString('☕'️)       // true
oo.isString('')        // true

oo.isString(42)        // false
oo.isString(undefined) // false
oo.isString(null)      // false
```

[↑](#json8)

#### boolean

Returns true for boolean, false otherwise.

```javascript
oo.is(true, 'boolean') // true
oo.isBoolean(false)    // true

oo.isBoolean(0)        // false
oo.isBoolean('foo')    // false
```

[↑](#json8)

#### null

Returns true for null, false otherwise.

```javascript
oo.is(null, 'null')  // true
oo.isNull(null)      // true

oo.isNull(undefined) // false
```

[↑](#json8)

#### JSON

Returns true for any JSON valid value.
JSON valid values are: number, boolean, null, string, array, object.

This method is not recursive, if you need to deep check for validity use the [valid method](#valid).

```javascript
oo.is(true, 'JSON')      //true
oo.isJSON('foo')         //true
oo.isJSON(null)          //true
oo.isJSON({})            //true
oo.isJSON([])            //true
oo.isJSON(42)            //true
oo.isJSON(new Map())     //true
oo.isJSON(new Set())     //true

oo.isJSON(undefined)     //false
oo.isJSON(NaN)           //false
oo.isJSON(Infinity)      //false
oo.isJSON(-Infinity)     //false
oo.isJSON(function() {}) //false
```

[↑](#json8)

## valid

Recursive version of [is JSON](#json), works on primitive values as well.

```javascript
oo.valid(true)                   //true
oo.valid({"foo": "bar"})         //true

oo.valid({"foo": undefined})     //false
oo.valid({"foo": NaN})           //false
oo.valid(["bar", function() {}]) //false
```

[↑](#json8)

## serialize

Takes a JSON document and returns a parseable JSON string. Uses ```JSON.stringify``` underneath so it's still fast.

Differences with [JSON.stringify](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

* Throws a TypeError for any invalid JSON value encountered such as
  * undefined
  * Infinity
  * -Infinity
  * NaN
  * symbols
  * functions
* Works with [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) (serialize as JSON object)
* Works with [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) (serialize as JSON array)
* Serializes signed zeros (-0) as "-0" while JSON.stringify returns "0"
* Ignores [toJSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON_behavior) function property.
* Does not serialize Date objects into ISO date strings (see previous bullet point for reason), use [Date.toISOString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
* Options are provided as an object instead of arguments
* There is no support to the [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter) argument. (yet?)

```javascript
oo.serialize(doc[, options]);

oo.serialize({"foo": "bar"})
// {"foo":"bar"}

oo.serialize({"foo": "bar"}, {spacer: 2})
// {
//   "foo": "bar"
// }

var set = new Set()
set.add('hello')
oo.serialize(set)
// ["hello"]

var map = new Map()
map.set('foo', 'bar')
oo.serialize(map)
// {"foo":"bar"}

// Because JSON8 ignores the toJSON property, it doesn't serialize
// Date objects into ISO date strings.
// Use Date.toISOString() instead of relying on Date JSON serialization.

var obj = {};
var date = new Date();

// BAD
obj.date = date
JSON.stringify(obj) // '{"date":"2015-10-21T16:29:00.000Z"}''
oo.serialize(obj)   // '{"date":"obj"}'

// GOOD
obj.date = date.toISOString()
JSON.stringify(obj) // '{"date":"2015-10-21T16:29:00.000Z"}''
oo.serialize(obj)   // '{"date":"2015-10-21T16:29:00.000Z"}''
```

[↑](#json8)

## parse

Takes a JSON string and returns a JavaScript value.

```javascript
var doc = oo.parse(string[, options]);
```

```options.set``` to parse JSON arrays as Set (default false).
```options.map``` to parse JSON objects as Map (default false).

[↑](#json8)

# Motivations

## Types

Getting/asserting the JSON type of a value in JavaScript is troublesome.

* [oo.type](#type) returns the JSON type of any value

* [oo.is](#is) checks if a value is of the provided type

* [oo.isStructure](#structure) checks if a value is a JSON structure (an array or an object)

* [oo.isPrimitive](#primitive) checks if a value is a JSON primitive (null, boolean, string, number)

[↑](#json8)

## Safety

[oo.serialize](#serialize) will throw an exception for any non JSON valid value (undefined, NaN, Infinity, -Infinity, ...) instead of ignoring it or replacing it with ```null``` like JSON.striginfy does.

JSON8 [types](#types) helps avoiding many common errors as well.

[↑](#json8)

## Map and Set

[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) are new structures available in ES6. Both are serializable and parseable as JSON, Map as object and Set as array. JSON8 was designed with that in mind and every single method supports Map and Set, a few examples:

* [isArray](#array) returns ```true``` for Set
* [isObject](#object) returns ```true``` for Map
* [valid](#valid), [isStructure](#structure), [isJSON](#JSON) return ```true``` for Map and Set
* [type](#type) returns ```'array'``` for Set and ```'object'``` for Map
* [serialize](#serialize) stringifies Set as array and Map as object
* [parse](#parse) optionally parses arrays as Set and objects as Map

[↑](#json8)

## Comparaisons

```javascript

// undefined is not JSON valid
JSON.stringify(undefined) // undefined
oo.serialize(undefined)   // TypeError

JSON.stringify({foo: undefined}) // '{}'
oo.serialize({foo: undefined})   // TypeError

JSON.stringify([undefined]) // '[null]'
oo.serialize([undefined])   // TypeError

// same applies for NaN, Infinity and -Infinity
typeof NaN   // 'number'
oo.type(NaN) // undefined

JSON.stringify(NaN)        // 'null'
JSON.stringify({foo: NaN}) // '{"foo":null}'
JSON.stringify([NaN])      // '[null]'
oo.serialize(NaN)          // TypeError

// typeof null returns 'object'
typeof null   // 'object'
oo.type(null) // 'null'

// arrays
var array = []
typeof []      // 'object'
oo.type(array) // 'array'
array[2] = 'foo'
array[1]              // undefined
array[0]              // undefined
JSON.stringify(array) // '[null,null,"foo"]'
oo.serialize(array)   // TypeError

// functions
JSON.stringify(function(){})        // undefined
JSON.stringify({foo: function(){}}) // '{}'
JSON.stringify([function(){}])      // '[null]'
oo.serialize(function() {})         // TypeError

// Set
var set = new Set()
typeof set   // 'object'
oo.type(set) // 'array'

set.add('foo')
JSON.stringify(set) // '{}'
oo.serialize(set)   // '["foo"]'

// Map
var map = new Map()
typeof map   // 'object'
oo.type(map) // 'object'

map.set('foo', 'bar')
JSON.stringify(map) // '{}'
oo.serialize(map)   // '{"foo": "bar"}'

// typeof Date returns 'object' but JSON.stringify returns a string
typeof new Date()          // 'object'
JSON.stringify(new Date()) // '2015-10-21T16:29:00.000Z'
oo.type(new Date())        // 'object'
oo.serialize(new Date())   // '{}'
// if you do want a string date in your JSON use one of the many Date methods such as toISOString

// -0
-0 === 0           //  true
oo.equal(-0, 0)    //  false

JSON.parse("-0")   //  -0
JSON.stringify(-0) //  "0"

oo.parse("-0")     //  -0
oo.serialize(-0)   // "-0"
```

[↑](#json8)

# Tests

```
npm install -g mocha babel browserify
npm test
```

[↑](#json8)

# Contributing

See [CONTRIBUTING.md](https://github.com/JSON8/JSON8/blob/master/CONTRIBUTING.md)

[↑](#json8)
