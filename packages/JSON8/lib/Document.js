'use strict'

var parse = require('./parse')
var clone = require('./clone')
var equal = require('./equal')
var serialize = require('./serialize')

var Document = function(value) {
  this.value = value
}

Document.prototype.toJSON = function() {
  return this.value
}

Document.prototype.toString = function() {
  return serialize(this.value)
}

Document.prototype.clone = function() {
  return new Document(clone(this.value))
}

Document.prototype.equal = function(obj) {
  return equal(this.value, obj instanceof Document ? obj.value : obj)
}

Document.prototype.parse = function() {
  this.value = parse.apply(null, [this.value].concat(arguments))
}

;[
  'has',
  'hasKey',
  'hasValue',
  'is',
  'isArray',
  'isBoolean',
  'isJSON',
  'isNull',
  'isNumber',
  'isObject',
  'isPrimitive',
  'isString',
  'isStructure',
  'serialize',
  'type',
  'valid',
].forEach(function(method) {
  var fn = require('./' + method)
  Document.prototype[method] = function() {
    var args = [this.value].concat(arguments)
    return fn.apply(null, args)
  }
})

module.exports = Document
