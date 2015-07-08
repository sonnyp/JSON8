'use strict'

var OBJECT = require('./types').OBJECT

module.exports = function forEach(obj, fn, ctx) {
  if (typeof obj !== OBJECT || obj === null)
    throw new TypeError('object must be an iterable structure')

  if (Array.isArray(obj) || (global.Map && obj instanceof Map) || (global.Set && obj instanceof Set)) {
    obj.forEach(fn, ctx)
  }
  else {
    if (ctx) fn = fn.bind(ctx)
    Object.keys(obj).forEach(function(key) {
      fn(obj[key], key, obj)
    })
  }
}
