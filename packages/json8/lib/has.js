'use strict'

const hasValue = require('./hasValue')
const hasKey = require('./hasKey')

module.exports = function has(obj, key) {
  if (Array.isArray(obj) || (global.Set && obj instanceof Set))
    return hasValue(obj, key)

  return hasKey(obj, key)
}
