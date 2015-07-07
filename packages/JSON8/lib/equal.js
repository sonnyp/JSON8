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

  if (Array.isArray(a)) {
    if (a.length !== b.length) return false

    for (var i = 0, l = a.length; i < l; i++)
      if (!equal(a[i], b[i])) return false
    return true
  }

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

  if (Object.keys(a).length !== Object.keys(b).length) return false
  for (var k in a) {
    if (!equal(a[k], b[k])) return false
  }

  return true
}

// console.log(module.exports(new Set(['foo']), new Set(['bar'])))
