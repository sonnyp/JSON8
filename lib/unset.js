'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var STRING = types.STRING

module.exports = function unset(obj, key) {
  if (typeof key !== STRING)
    throw new TypeError(key + ' is not a string')

  if ((global.Set && obj instanceof Set) || Array.isArray(obj) || obj === null || typeof obj !== OBJECT)
    throw new TypeError(obj + ' is not an object')

  if (global.Map && obj instanceof Map)
    obj.delete(key)
  else
    delete obj[key]
}
