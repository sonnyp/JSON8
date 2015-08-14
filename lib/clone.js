'use strict'

var types = require('./types')
var OBJECT = types.OBJECT

module.exports = function clone(obj) {
  if (typeof obj !== OBJECT || obj === null)
    return obj

  var c, i, l

  if (Array.isArray(obj)) {
    c = []
    for (i = 0, l = obj.length; i < l; i++)
      c[i] = clone(obj[i])
  }
  else if (global.Set && obj instanceof Set) {
    c = new Set()
    obj.forEach(function(item) {
      c.add(clone(item))
    })
  }
  else if (global.Map && obj instanceof Map) {
    c = new Map()
    obj.forEach(function(value, key) {
      c.set(key, clone(value))
    })
  }
  else {
    c = {}
    var keys = Object.keys(obj)
    for (i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      c[key] = clone(obj[key])
    }
  }

  return c
}
