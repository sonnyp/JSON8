'use strict'

var types = require('./types')
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN
var NUMBER = types.NUMBER

var is = require('./is')
var isArray = is.array
var isObject = is.object

module.exports = function equal(a, b) {
  var type = typeof a
  if ([STRING, BOOLEAN, NUMBER].indexOf(type) > -1)
    return a === b

  if (a === null)
    return a === b

  if (isArray(a)) {
    if (a.length !== b.length)
      return false

    for (var i = 0, l = a.length; i < l; i++) {
      if (!equal(a[i], b[i]))
        return false
    }
    return true
  }

  if (isObject(a)) {
    if (Object.keys(a).length !== Object.keys(b).length)
      return false

    for (var k in a) {
      if (!equal(a[k], b[k]))
        return false
    }
    return true
  }

  return false
}
