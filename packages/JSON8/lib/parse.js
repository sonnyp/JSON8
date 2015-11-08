'use strict'

var OBJECT = require('./types').OBJECT

function replace(obj, options) {
  var i
  var l

  if (Array.isArray(obj)) {
    if (options.set === true) {
      var set = new Set()
      for (i = 0, l = obj.length; i < l; i++)
        set.add(replace(obj[i], options))
      return set
    }
    for (i = 0, l = obj.length; i < l; i++)
      obj[i] = replace(obj[i], options)
    return obj
  }

  if (typeof obj === OBJECT && obj !== null) {
    var keys = Object.keys(obj)
    var key
    if (options.map === true) {
      var map = new Map()
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i]
        map.set(key, replace(obj[key], options))
      }
      return map
    }
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      obj[key] = replace(obj[key], options)
    }
    return obj
  }

  return obj
}

module.exports = function parse(string, options) {
  var obj = JSON.parse(string)

  if (typeof options !== OBJECT || options === null)
    return obj

  return replace(obj, options)
}
