'use strict'

var OBJECT = require('./types').OBJECT

module.exports = function forOf(obj, fn, ctx) {
  if (typeof obj !== OBJECT || obj === null)
    throw new TypeError(obj + ' is not a structure')

  if (ctx) fn = fn.bind(ctx)

  if (global.Map && obj instanceof Map) {
    for (var kv of obj) {
      if (fn(kv[1], kv[0]) === true) break
    }
    return
  }

  if (global.Set && obj instanceof Set) {
    for (var item of obj) {
      if (fn(item, item) === true) break
    }
    return
  }

  var i
  var l

  if (Array.isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      if (fn(obj[i], i) === true) break
    }
  }
  else {
    var keys = Object.keys(obj)
    for (i = 0, l = obj.length; i < l; i++) {
      var key = keys[i]
      if (fn(obj[key], key) === true) break
    }
  }
}
