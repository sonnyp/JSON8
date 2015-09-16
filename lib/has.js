'use strict'

var hasValue = require('./hasValue')
var hasKey = require('./hasKey')

module.exports = function has(obj, key) {
  if (Array.isArray(obj) || (global.Set && obj instanceof Set))
    return hasValue(obj, key)

  return hasKey(obj, key)
}
