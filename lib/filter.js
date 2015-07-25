'use strict'

var map = require('./map')

module.exports = function filter(obj, fn, ctx) {
  if (ctx) fn = fn.bind(ctx)
  map(obj, function(value, key) {
    return fn(value, key) ? value : undefined
  })
}
