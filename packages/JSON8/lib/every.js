'use strict'

var forOf = require('./forOf')

module.exports = function some(obj, fn, ctx) {
  var result = true
  forOf(obj, function(value, key) {
    if (!fn.call(ctx, value, key)) {
      result = false
      return true
    }
  })
  return result
}
