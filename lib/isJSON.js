'use strict'

var types = require('./types')
var NUMBER = types.NUMBER
var OBJECT = types.OBJECT
var BOOLEAN = types.BOOLEAN
var STRING = types.STRING

module.exports = function isJSON(obj) {
  var type = typeof obj
  return type === BOOLEAN || type === STRING || type === OBJECT || (type === NUMBER && isFinite(obj))
}
