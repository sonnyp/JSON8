JSON8
=====

[![build status](https://img.shields.io/travis/JSON8/JSON8.svg?style=flat-square)](https://travis-ci.org/JSON8/JSON8)

* [Getting started](#getting-started)
* [Motivations](#motivations)
* [Methods](#methods)
  * [clone](#clone)
  * [equal](#equal)
  * [type](#type)
  * [size](#size)
  * [forEach](#forEach)
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
  * [stringify](#stringify)
  * [parse](#parse)
* [Tests](#tests)
* [Contributing](#contributing)

# Getting started

```npm install json8```

```javascript
var JSON8 = require('json8');
```

or

```xml
<script src="node_modules/json8/JSON8.js"></script>
```
```javascript
var JSON8 = window.JSON8
```

# Motivations

Even though JSON is inspired by JavaScript, JavaScript lacks some basic features to work efficiently and safely with JSON.

Plus there are some pitfalls to be aware of. Examples of the common ones:

```javascript
JSON.stringify(undefined)        // undefined
JSON.stringify({foo: undefined}) // '{}'
JSON.stringify([undefined])      // '[null]'

typeof NaN                 // 'number'
JSON.stringify(NaN)        // 'null'
JSON.stringify({foo: NaN}) // '{"foo":null}'
JSON.stringify([NaN])      // '[null]'

typeof null      // 'object'
null.foo         // throws TypeError
null.foo = 'bar' // throws TypeError

typeof new Date()          // 'object'
JSON.stringify(new Date()) // '2015-10-21T16:29:00.000Z'

var array = []
array[2] = 'foo'
array[1]              // undefined
array[0]              // undefined
JSON.stringify(array) // '[null,null,"foo"]'

JSON.stringify(function(){})        // undefined
JSON.stringify({foo: function(){}}) // '{}'
JSON.stringify([function(){}])      // '[null]'

typeof Infinity           // 'number'
JSON.stringify(Infinity)  // 'null'
typeof -Infinity          // 'number'
JSON.stringify(-Infinity) // 'null'

JSON.parse("-0")   // -0
JSON.stringify(-0) // '0'

var set = new Set()
set.add('foo')
JSON.stringify(set)   // '{}'

var map = new Map()
map.set('foo', 'bar')
JSON.stringify(map)   // '{}''
```

[↑](#json8)

# Methods

## clone

Deep clone any value.

```javascript
var doc = {"foo": "bar"}
var clone = JSON8.clone(doc) // {"foo":"bar"}
copy === doc                 // false

JSON8.clone(true) // true
JSON8.clone(42)   // 42
```

[↑](#json8)

## equal

Test for equality between two documents.

```javascript
JSON8.equal(true, true)     // true
JSON8.equal([], [])         // true
JSON8.equal({}, {})         // true
JSON8.equal(
  {foo: 'bar', bar: 'foo'}
  {bar: 'foo', foo: 'bar'}
)                           // true

JSON8.equal([1, 2], [2, 1]) // false
```

[↑](#json8)

## type

Returns the JSON type for a value, ```undefined``` if the value is not of any JSON type.

```javascript
JSON8.type({})        // "object"
JSON8.type(new Map()) // "object"
JSON8.type([])        // "array"
JSON8.type(new Set()) // "array"
JSON8.type(42)        // "number"
JSON8.type('foo')     // "string"
JSON8.type(null)      // "null"
JSON8.type(true)      // "boolean"

JSON8.type(undefined)      // undefined
JSON8.type(Infinity)       // undefined
JSON8.type(-Infinity)      // undefined
JSON8.type(NaN)            // undefined
JSON8.type(Symbol())       // undefined
JSON8.type(function() {})  // undefined
```

[↑](#json8)

## size

Returns the size (length) of a structure.

```javascript
JSON8.size([], 0)
JSON8.size({}, 0)
JSON8.size(new Set(), 0)
JSON8.size(new Map(), 0)
```

## forEach

Iterates over a structure.

```javascript
var log = function(value, name) {
  console.log(name + ':' + value)
}

JSON8.forEach([], log)
JSON8.forEach({}, log)
JSON8.forEach(new Map(), log)
JSON8.forEach(new Set(), log)
```

## is

For each type you can use the syntax

```javascript
JSON8.is('foo', type)
```
or
```javascript
JSON.isType('foo')
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
JSON8.is({}, 'structure')    // true
JSON8.isStructure([])        // true
JSON8.isStructure(new Set()) // true
JSON8.isStructure(new Map()) // true

JSON8.isStructure(null)   // false
```

[↑](#json8)

#### primitive

Returns true for primitives, false otherwise.
Primitives are: number, boolean, null, string.

```javascript
JSON8.is(null, 'primitive') // true
JSON8.isPrimitive(true)     // true
JSON8.isPrimitive('foo')    // true
JSON8.isPrimitive(42)       // true

JSON8.isPrimitive([]])      // false
JSON8.isPrimitive({})       // false
JSON8.isPrimitive(Infinity) // false
JSON8.isPrimitive(NaN)      // false
```

[↑](#json8)

#### object

Returns true for object, false otherwise.

```javascript
JSON8.is({}, 'object')        // true
JSON8.isObject({})            // true
JSON8.isObject({})            // true
JSON8.isObject(new Map())     // true

JSON8.isObject([])            // false
JSON8.isObject(null)          // false
JSON8.isObject(function() {}) // false
JSON8.isObject(new Set())     // false
```

[↑](#json8)

#### array

Returns true for array, false otherwise.

```javascript
JSON8.is([], 'array')    // true
JSON8.isArray([])        // true
JSON8.isArray(new Set()) // true

JSON8.isArray({})        // false
JSON8.isArray(new Map()) // false
```

[↑](#json8)

#### number

Returns true for number, false otherwise.

```javascript
JSON8.is(42, 'number')    // true
JSON8.isNumber(4.2)       // true
JSON8.isNumber(-42)       // true

JSON8.isNumber(Infinity)  // false
JSON8.isNumber(-Infinity) // false
JSON8.isNumber(NaN)       // false
```

[↑](#json8)

#### string

Returns true for string, false otherwise.

```javascript
JSON8.is('foo', 'string') // true
JSON8.isString('☕'️)       // true
JSON8.isString('')        // true

JSON8.isString(42)        // false
JSON8.isString(undefined) // false
JSON8.isString(null)      // false
```

[↑](#json8)

#### boolean

Returns true for boolean, false otherwise.

```javascript
JSON8.is(true, 'boolean') // true
JSON8.isBoolean(false)    // true
JSON8.isBoolean(false)    // true

JSON8.isBoolean(0)        // false
JSON8.isBoolean(1)        // false
```

[↑](#json8)

#### null

Returns true for null, false otherwise.

```javascript
JSON8.is(null, 'null')  // true
JSON8.isNull(null)      // true
JSON8.isNull(null)      // true

JSON8.isNull(undefined) // false
```

[↑](#json8)

#### JSON

Returns true for any JSON valid value.
JSON valid values are: number, boolean, null, string, array, object.

This method is not recursive, if you need to deep check for validity use the [valid method](#valid).

```javascript
JSON8.is(true, 'JSON')      //true
JSON8.isJSON('foo')         //true
JSON8.isJSON(null)          //true
JSON8.isJSON({})            //true
JSON8.isJSON([])            //true
JSON8.isJSON(42)            //true
JSON8.isJSON(new Map())     //true
JSON8.isJSON(new Set())     //true

JSON8.isJSON(undefined)     //false
JSON8.isJSON(NaN)           //false
JSON8.isJSON(Infinity)      //false
JSON8.isJSON(-Infinity)     //false
JSON8.isJSON(function() {}) //false
```

[↑](#json8)

## valid

Recursive version of [is JSON](#json), works on primitive values as well.

```javascript
JSON8.valid(true)                   //true
JSON8.valid({"foo": "bar"})         //true

JSON8.valid({"foo": undefined})     //false
JSON8.valid({"foo": NaN})           //false
JSON8.valid(["bar", function() {}]) //false
```

[↑](#json8)

## serialize

Takes a JSON document and returns a parseable JSON string. It is a stricter JSON.stringify alternative.

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
* Second argument is equivalent to the JSON.stringfy [space](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#space_argument) (third) argument
* There is no alternative to the [replacer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#The_replacer_parameter) argument

```javascript
JSON8.serialize(doc[, spacer]);

JSON8.serialize({"foo": "bar"})
// {"foo":"bar"}

JSON8.serialize({"foo": "bar"}, 2)
// {
//   "foo": "bar"
// }

var set = new Set()
set.add('hello')
JSON8.serialize(set)
// ["hello"]

var map = new Map()
map.set('foo', 'bar')
JSON8.serialize(map)
// {"foo":"bar"}

// Because JSON8 ignores the toJSON property, it doesn't serialize
// Date objects into ISO date strings.
// Use Date.toISOString() instead of relying on Date JSON serialization.

var obj = {};
var date = new Date();

// BAD
obj.date = date
JSON.stringify(obj)  // '{"date":"2015-10-21T16:29:00.000Z"}''
JSON8.serialize(obj) // '{"date":"obj"}'

// GOOD
obj.date = date.toISOString()
JSON.stringify(obj)  // '{"date":"2015-10-21T16:29:00.000Z"}''
JSON8.serialize(obk) // '{"date":"2015-10-21T16:29:00.000Z"}''
```

[↑](#json8)

## stringify

Alias for [JSON.stringify](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

```javascript
var string = JSON8.stringify(doc);
```

[↑](#json8)

## parse

Alias for [JSON.parse](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)

```javascript
var doc = JSON8.parse(string);
```

[↑](#json8)

# Tests

```
npm install -g eslint mocha babel
npm test
```

[↑](#json8)

# Contributing

See [CONTRIBUTING.md](https://github.com/JSON8/JSON8/blob/master/CONTRIBUTING.md)

[↑](#json8)
