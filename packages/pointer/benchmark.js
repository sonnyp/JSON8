'use strict'

/* eslint-disable no-console */

var benchmark = require('benchmark')
var ooPointer = require('./index')

var jsonpointer = require('jsonpointer') // https://github.com/janl/node-jsonpointer
var jsonpointerjs = require('jsonpointer.js') // https://github.com/alexeykuzmin/jsonpointer.js
var manuelstofer = require('json-pointer') // https://github.com/manuelstofer/json-pointer
var flitbit = require('json-ptr') // https://github.com/flitbit/json-ptr

var doc = {
  "foo": [1, 2, 3, 4], // eslint-disable-line no-magic-numbers
  "baz": [{
    "qux": "hello",
  }],
}

var pointer = "/baz/0/qux"
var compiled = ooPointer.compile(pointer)

var janlCompiled = jsonpointer.compile(pointer)

var evaluate = jsonpointerjs.get(doc);

var ptr = flitbit.create(pointer);

var suite = benchmark.Suite('pointer')

suite.add('find', function() {
  ooPointer.find(doc, pointer)
}).add('compiled', function() {
  compiled(doc)
}).add('compile + compiled', function() {
  ooPointer.compile(pointer)(doc)
}).add('janl/node-jsonpointer get', function () {
  jsonpointer.get(doc, pointer)
}).add('janl/node-jsonpointer compiled get', function () {
  janlCompiled.get(doc)
}).add('alexeykuzmin/jsonpointer.js get', function () {
  jsonpointer.get(doc, pointer)
}).add('alexeykuzmin/jsonpointer.js evaluate', function () {
  evaluate(pointer)
}).add('manuelstofer/json-pointer get', function () {
  manuelstofer.get(doc, pointer)
}).add('flitbit/json-ptr get', function () {
  flitbit.get(doc, pointer)
}).add('flitbit/json-ptr compiled', function () {
  ptr.get(doc)
}).on('cycle', function(event) {
  console.log(event.target.toString())
}).on('complete', function() {
  console.log('Fastest is ' + suite.filter('fastest').map('name'))
}).run()
