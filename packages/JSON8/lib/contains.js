'use strict'

module.exports = function contains(obj, item) {
  if (Array.isArray(obj))
    return obj.indexOf(item) > -1

  if (global.Set && obj instanceof Set)
    return obj.has(item)

  throw new TypeError(obj + ' is not an array')
}
