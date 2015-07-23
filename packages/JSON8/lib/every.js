'use strict'

var forOf = require('./forOf')

module.exports = function some(obj, fn, ctx) {
  var result = true
  forOf(obj, function(value, key, stop) {
    if (!fn.apply(ctx, arguments)) {
      result = false
      stop()
    }
  })
  return result
}
