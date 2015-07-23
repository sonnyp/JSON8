'use strict'

var OBJECT = require('./types').OBJECT

module.exports = function size(obj) {
  if (typeof obj !== OBJECT || obj === null)
    throw new TypeError(obj + ' is not a structure')

  if (Array.isArray(obj))
    return obj.length

  if (global.Map && obj instanceof Map)
    return obj.size

  if (global.Set && obj instanceof Set)
    return obj.size

  return Object.keys(obj).length
}
