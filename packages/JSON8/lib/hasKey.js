'use strict'

var isObject = require('./isObject')
var equal = require('./equal')
var STRING = require('./types').STRING
var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function hasKey(obj, key) {
  if (typeof key !== STRING) return false
  if (!isObject(obj)) return false

  if (global.Map && obj instanceof Map) {
    var entries = obj.keys()
    for (var i = 0, l = obj.size; i < l; i++) {
      var k = entries.next().value
      if (equal(k, key)) return obj.get(k) !== undefined
    }
    return false
  }

  return hasOwnProperty.call(obj, key) && obj[key] !== undefined
}
