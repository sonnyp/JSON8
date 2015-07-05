'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var ARRAY = types.ARRAY
var NULL = types.NULL
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN
var NUMBER = types.NUMBER

var isArray = require('./is').array

module.exports = function type(obj) {
  var type = typeof obj

  if (type === NUMBER) {
    if (!(isNaN(obj) || obj === Infinity || obj === -Infinity))
      return NUMBER
  }
  else if (type === OBJECT) {
    if (isArray(obj)) return ARRAY
    else if (obj === null) return NULL
    else if (type === OBJECT) return OBJECT
  }
  else if (type === BOOLEAN || type === STRING)
    return type
}
