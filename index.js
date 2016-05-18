'use strict'

var types = require('json8-types')
var Document = require('./lib/Document')

var oo = module.exports = function(doc) {
  return new Document(doc)
}

oo.clone = require('json8-clone')
oo.Document = Document
oo.equal = require('json8-equal')

oo.has = require('./lib/has')
oo.hasKey = require('./lib/hasKey')
oo.hasValue = require('./lib/hasValue')

oo.is = require('json8-is')
oo.isArray = require('json8-isArray')
oo.isBoolean = require('json8-isBoolean')
oo.isJSON = require('json8-isJSON')
oo.isNull = require('json8-isNull')
oo.isNumber = require('json8-isNumber')
oo.isObject = require('json8-isObject')
oo.isPrimitive = require('json8-isPrimitive')
oo.isString = require('json8-isString')
oo.isStructure = require('json8-isStructure')

oo.parse = require('json8-parse')
oo.serialize = require('json8-serialize')
oo.type = require('json8-type')
for (var type in types)
  oo[type] = types[type]
oo.valid = require('json8-valid')

// Document

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
  var fn = oo[method]
  Document.prototype[method] = function() {
    var args = [this.value].concat(arguments)
    return fn.apply(null, args)
  }
})

Document.prototype.toString = function() {
  return oo.serialize(this.value)
}

Document.prototype.clone = function() {
  return new Document(oo.clone(this.value))
}

Document.prototype.equal = function(obj) {
  return oo.equal(this.value, obj instanceof Document ? obj.value : obj)
}

Document.prototype.parse = function() {
  this.value = oo.parse.apply(null, [this.value].concat(arguments))
}
