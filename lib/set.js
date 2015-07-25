'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var STRING = types.STRING

module.exports = function set(obj, key, value) {
  if (typeof key !== STRING)
    throw new TypeError(key + ' is not a string')

  if (global.Map && obj instanceof Map)
    obj.set(key, value)
  else if (typeof obj === OBJECT && obj !== null)
    obj[key] = value
  else
    throw new TypeError(obj + ' is not an object')
}
