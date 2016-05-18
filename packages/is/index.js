'use strict'

var types = require('json8-types')
var NUMBER = types.NUMBER
var OBJECT = types.OBJECT
var BOOLEAN = types.BOOLEAN
var STRING = types.STRING
var NULL = types.NULL
var ARRAY = types.ARRAY

var methods = Object.create(null)
methods[ARRAY] = require('json8-isArray')
methods[BOOLEAN] = require('json8-isBoolean')
methods.JSON = require('json8-isJSON')
methods[NULL] = require('json8-isNull')
methods[NUMBER] = require('json8-isNumber')
methods[OBJECT] = require('json8-isObject')
methods.primitive = require('json8-isPrimitive')
methods[STRING] = require('json8-isString')
methods.structure = require('json8-isStructure')

module.exports = function is(obj, type) {
  var fn = methods[type]
  if (!fn)
    throw new Error(type + ' is not a valid type')
  return fn(obj)
}
