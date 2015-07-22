'use strict'

var types = require('./types')
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN
var NUMBER = types.NUMBER
var OBJECT = types.OBJECT

module.exports = function equal(a, b) {
  var type = typeof a
  if ([STRING, BOOLEAN, NUMBER].indexOf(type) > -1)
    return a === b

  if (a === null) return a === b

  if (type !== OBJECT) return false

  if (global.Set && a instanceof Set) {
    if (a.size !== b.size) return false
    for (var item of a)
      if (!b.has(item)) return false
    return true
  }

  if (global.Map && a instanceof Map) {
    if (a.size !== b.size) return false

    for (var kv of a)
      if (b.get(kv[0]) !== kv[1]) return false
    return true
  }

  var i
  var l

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false
    for (i = 0, l = a.length; i < l; i++)
      if (!equal(a[i], b[i])) return false
    return true
  }

  var keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  for (i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    if (!equal(a[key], b[key]) || !b.hasOwnProperty(key)) return false
  }
  return true
}

// console.log(module.exports(new Set(['foo']), new Set(['bar'])))
