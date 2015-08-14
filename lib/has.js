'use strict'

var type = require('./type')
var OBJECT = require('./types').OBJECT

module.exports = function has(obj, item) {
  if (type(obj) !== OBJECT)
    throw new Error(obj + ' is not an object')

  if (global.Map && obj instanceof Map)
    return obj.has(item)

  return obj.hasOwnProperty(item)
}
