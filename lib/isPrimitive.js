'use strict'

var types = require('./types')
var BOOLEAN = types.BOOLEAN
var STRING = types.STRING
var NUMBER = types.NUMBER

module.exports = function isPrimitive(obj) {
  if (obj === null)
    return true

  var type = typeof obj
  if (type === NUMBER && isFinite(obj))
    return true

  return (type === BOOLEAN || type === STRING || obj === null)
}
