'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var ARRAY = types.ARRAY
var NULL = types.NULL
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN
var NUMBER = types.NUMBER

module.exports = function type(obj) {
  var t = typeof obj

  if (t === BOOLEAN || t === STRING) return t
  else if (t === NUMBER && isFinite(obj)) return NUMBER
  else if (t === OBJECT) {
    if (Array.isArray(obj)) return ARRAY
    else if (global.Set && obj instanceof Set) return ARRAY
    else if (global.Map && obj instanceof Map) return OBJECT
    else if (obj === null) return NULL
    else if (t === OBJECT) return OBJECT
  }
}
