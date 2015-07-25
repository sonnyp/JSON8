'use strict'

module.exports = function remove(obj, value) {
  if (Array.isArray(obj)) {
    var idx = obj.indexOf(value)
    if (idx === -1) return
    obj.splice(idx, 1)
  }
  else if (global.Set && obj instanceof Set)
    obj.remove(value)
  else
    throw new TypeError(obj + ' is not an array')
}
