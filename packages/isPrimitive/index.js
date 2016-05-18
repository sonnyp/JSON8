'use strict'

var types = require('json8-types')
var NUMBER = types.NUMBER
var BOOLEAN = types.BOOLEAN
var STRING = types.STRING

module.exports = function isPrimitive(obj) {
  if (obj === null) return true

  var type = typeof obj
  if (type === NUMBER && isFinite(obj))
    return true

  return (type === BOOLEAN || type === STRING || obj === null)
}
