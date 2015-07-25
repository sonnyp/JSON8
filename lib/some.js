'use strict'

var forOf = require('./forOf')

module.exports = function some(obj, fn, ctx) {
  if (ctx) fn = fn.bind(ctx)
  var result = false
  forOf(obj, function(value, key) {
    if (fn(value, key)) {
      result = true
      return true
    }
  })
  return result
}
