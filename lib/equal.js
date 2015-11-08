'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var ARRAY = types.ARRAY
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN
var NUMBER = types.NUMBER
var NULL = types.NULL
var type = require('./type')

function toArray(set) {
  var array = []
  set.forEach(function(item) {
    array.push(item)
  })
  return array
}

function toObject(map) {
  var object = Object.create(null)
  map.forEach(function(value, key) {
    object[key] = value
  })
  return object
}

module.exports = function equal(a, b) {
  var ta = type(a)
  var tb = type(b)

  if (ta !== tb) return false

  var t = ta

  switch (t) {
  case NUMBER:
    if (a === 0 && (1 / a) === -Infinity)
      return b === 0 && (1 / b === -Infinity)
    return a === b
  case STRING:
  case NULL:
  case BOOLEAN:
      return a === b
  }

  var i, l
  if (t === ARRAY) {
    if (global.Set) {
      if (a instanceof Set) a = toArray(a)
      if (b instanceof Set) b = toArray(b)
    }
    if (a.length !== b.length) return false
    for (i = 0, l = a.length; i < l; i++)
      if (!equal(a[i], b[i])) return false
    return true
  }

  if (t === OBJECT) {
    if (global.Map) {
      if (a instanceof Map) a = toObject(a)
      if (b instanceof Map) b = toObject(b)
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

  return true
}
