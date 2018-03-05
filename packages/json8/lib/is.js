'use strict'

const types = require('./types')
const NUMBER = types.NUMBER
const OBJECT = types.OBJECT
const BOOLEAN = types.BOOLEAN
const STRING = types.STRING
const NULL = types.NULL
const ARRAY = types.ARRAY

const methods = Object.create(null)
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
  const fn = methods[type]
  if (!fn) throw new Error(type + ' is not a valid type')
  return fn(obj)
}
