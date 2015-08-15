'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN
var NUMBER = types.NUMBER

module.exports = function valid(obj) {
  var type = typeof obj
  switch (type) {
    case STRING:
    case BOOLEAN:
      return true
    case NUMBER:
      return isFinite(obj)
  }

  if (obj === null)
    return true
  else if (type !== OBJECT)
    return false

  var c
  var it

  if (global.Set && obj instanceof Set) {
    c = true
    var values = obj.values()
    while (c === true) {
      it = values.next()
      if (it.done === true) c = false
      else if (!valid(it.value)) return false
    }
    return true
  }

  if (global.Map && obj instanceof Map) {
    c = true
    var entries = obj.entries()
    while (c === true) {
      it = entries.next()
      if (it.done === true) {
        c = false
        continue
      }
      if (typeof it.value[0] !== 'string') return false
      else if (!valid(it.value[1])) return false
    }
    return true
  }

  var i
  var l

  if (Array.isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++)
      if (!valid(obj[i])) return false
    return true
  }

  var keys = Object.keys(obj)
  for (i = 0, l = keys.length; i < l; i++) {
    var k = keys[i]
    if (!valid(obj[k])) return false
  }
  return true
}
