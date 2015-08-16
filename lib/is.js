'use strict'

var types = require('./types')
var NUMBER = types.NUMBER
var OBJECT = types.OBJECT
var BOOLEAN = types.BOOLEAN
var STRING = types.STRING
var NULL = types.NULL
var ARRAY = types.ARRAY

var methods = Object.create(null)
methods[ARRAY] = require('./isArray')
methods[BOOLEAN] = require('./isBoolean')
methods.JSON = require('./isJSON')
methods[NULL] = require('./isNull')
methods[NUMBER] = require('./isNumber')
methods[OBJECT] = require('./isObject')
methods.primitive = require('./isPrimitive')
methods[STRING] = require('./isString')
methods.structure = require('./isStructure')

module.exports = function is(obj, type) {
  var fn = methods[type]
  if (!fn)
    throw new Error(type + ' is not a valid type')
  return fn(obj)
}
