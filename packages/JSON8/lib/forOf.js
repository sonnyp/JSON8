'use strict'

var OBJECT = require('./types').OBJECT

module.exports = function forOf(obj, fn, ctx) {
  if (typeof obj !== OBJECT || obj === null)
    throw new TypeError(obj + ' is not a structure')

  var stopped = false

  var stop = function() {
    stopped = true
  }

  if (ctx) fn = fn.bind(ctx)

  if (global.Map && obj instanceof Map) {
    for (var kv of obj) {
      fn(kv[1], kv[0], stop)
      if (stopped) break
    }
    return
  }

  if (global.Set && obj instanceof Set) {
    for (var item of obj) {
      fn(item, item, stop)
      if (stopped) break
    }
    return
  }

  var i
  var l

  if (Array.isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn(obj[i], i, stop)
      if (stopped) break
    }
  }
  else {
    var keys = Object.keys(obj)
    for (i = 0, l = obj.length; i < l; i++) {
      var key = keys[i]
      fn(obj[key], key, stop)
      if (stopped) break
    }
  }
}
