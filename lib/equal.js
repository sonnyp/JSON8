'use strict'

var types = require('./types')
var PRIMITIVES = types.PRIMITIVES
var type = require('./type')

var toArray = function(set) {
  var array = []
  set.forEach(function(item) {
    array.push(item)
  })
  return array
}

var toObject = function(map) {
  var object = Object.create(null)
  map.forEach(function(value, key) {
    object[key] = value
  })
  return object
}

module.exports = function equal(a, b) {
  if (global.Set && global.Map) {
    if (a instanceof Set)
      a = toArray(a)
    else if (a instanceof Map) {
      a = toObject(a)
    }
    if (b instanceof Set)
      b = toArray(b)
    else if (b instanceof Map) {
      b = toObject(b)
    }
  }

  console.log(a, typeof a)

  var ta = type(a)
  if (!ta)
    throw new Error(a + ' is not JSON valid')

  if (PRIMITIVES.indexOf(ta) > -1)
    return a === b

  if (ta !== type(b))
    return false

  var i, l
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
    if (b.hasOwnProperty && !b.hasOwnProperty(key)) return false
    if (!equal(b[key], a[key])) return false
  }

  return true
}
