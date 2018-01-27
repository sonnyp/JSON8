'use strict'

const isObject = require('./isObject')
const equal = require('./equal')
const STRING = require('./types').STRING
const hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function hasKey(obj, key) {
  if (typeof key !== STRING) return false
  if (!isObject(obj)) return false

  if (global.Map && obj instanceof Map) {
    const entries = obj.keys()
    for (let i = 0, l = obj.size; i < l; i++) {
      const k = entries.next().value
      if (equal(k, key)) return obj.get(k) !== undefined
    }
    return false
  }

  return hasOwnProperty.call(obj, key) && obj[key] !== undefined
}
