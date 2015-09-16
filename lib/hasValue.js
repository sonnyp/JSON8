'use strict'

var OBJECT = require('./types').OBJECT
var equal = require('./equal')

module.exports = function has(obj, value) {
  if (value === undefined) return false
  if (typeof obj !== OBJECT || obj === null) return false

  var i, l

  if (Array.isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      if (equal(obj[i], value)) return true
    }
    return false
  }

  if ((global.Map && obj instanceof Map) || (global.Set && obj instanceof Set)) {
    var entries = obj.entries()
    for (i = 0, l = obj.size; i < l; i++) {
      var item = entries.next().value
      if (equal(item[1], value) && item[0] !== undefined) return true
    }
    return false
  }

  var keys = Object.keys(obj)
  for (i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    if (equal(obj[key], value)) return true
  }

  return false
}
