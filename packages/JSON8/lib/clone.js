'use strict'

var is = require('./is')
var isArray = is.array
var isObject = is.object

module.exports = function clone(a) {
  var c

  if (isArray(a)) {
    c = []
    for (var i = 0, len = a.length; i < len; i++)
      c[i] = clone(a[i])
  }
  else if (isObject(a)) {
    c = {}
    for (var k in a)
      c[k] = clone(a[k])
  }
  else {
    c = a
  }

  return c
}
