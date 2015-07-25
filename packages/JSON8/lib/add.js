'use strict'

module.exports = function add(obj, value) {
  if (Array.isArray(obj))
    obj.push(value)
  else if (global.Set && obj instanceof Set)
    obj.add(value)
  else
    throw new TypeError(obj + ' is not an array')
}
