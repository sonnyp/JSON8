'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var STRING = types.STRING

module.exports = function unset(obj, key) {
  if (typeof key !== STRING)
    throw new TypeError(key + ' is not a string')

  if (global.Map && obj instanceof Map)
    obj.remove(key)
  else if (typeof obj === OBJECT && obj !== null)
    delete obj[key]
  else
    throw new TypeError(obj + ' is not an object')
}
