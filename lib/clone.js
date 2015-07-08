'use strict'

var OBJECT = require('./types').OBJECT

module.exports = function clone(obj) {
  if (typeof obj !== OBJECT || obj === null)
    return obj

  var c

  if (Array.isArray(obj)) {
    c = []
    for (var i = 0, len = obj.length; i < len; i++)
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
    for (var j = 0, l = keys.length; j < l; j++) {
      var key = keys[j]
      c[key] = clone(obj[key])
    }
  }

  return c
}
