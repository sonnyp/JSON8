'use strict'

var OBJECT = require('./types').OBJECT

module.exports = function forEach(obj, fn, ctx) {
  if (typeof obj !== OBJECT || obj === null)
    throw new Error('object must be a structure value')

  if (Array.isArray(obj) || (global.Map && obj instanceof Map) || (global.Set && obj instanceof Set)) {
    obj.forEach(fn, ctx)
  }
  else {
    Object.keys(obj).forEach(function(key) {
      fn.call(ctx, obj[key], key, obj)
    })
  }
}
