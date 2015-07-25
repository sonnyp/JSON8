'use strict'

var OBJECT = require('./types')

module.exports = function has(obj, item) {
  if (typeof obj !== OBJECT || obj === null)
    throw new TypeError(obj + ' is not a structure')

  if (Array.isArray(obj))
    return obj.indexOf(item) > -1

  if ((global.Map && obj instanceof Map) || (global.Set && obj instanceof Set))
    return obj.has(item)

  return obj[item] !== undefined && obj.hasOwnProperty(item)
}
