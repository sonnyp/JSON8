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
      return !(isNaN(obj) || obj === Infinity || obj === -Infinity)
  }

  if (obj === null)
    return true
  else if (type !== OBJECT)
    return false

  if (global.Set && obj instanceof Set) {
    for (var item of obj)
      if (!valid(item)) return false
    return true
  }

  if (global.Map && obj instanceof Map) {
    for (var kv of obj)
      if (!valid(kv[1])) return false
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
    var key = keys[i]
    if (!valid(obj[key])) return false
  }
  return true
}
