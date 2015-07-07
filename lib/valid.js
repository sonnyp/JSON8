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

  if (Array.isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++)
      if (!valid(obj[i])) return false
    return true
  }
  else if (global.Set && obj instanceof Set) {
    for (var item of obj)
      if (!valid(item)) return false
  }
  else if (global.Map && obj instanceof Map) {
    for (var value of obj)
      if (!valid(value)) return false
  }
  else {
    for (var k in obj)
      if (!valid(obj[k])) return false
  }

  return true
}
