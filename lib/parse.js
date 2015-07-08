'use strict'

var OBJECT = require('./types').OBJECT

var replace = function(obj, options) {
  if (Array.isArray(obj)) {
    var i = 0
    var l = obj.length
    if (options.set === true) {
      var set = new Set()
      for (; i < l; i++)
        set.add(replace(obj[i], options))
      return set
    }
    for (; i < l; i++)
      obj[i] = replace(obj[i], options)
    return obj
  }
  else if (typeof obj === OBJECT && obj !== null) {
    if (options.map === true) {
      var map = new Map()
      for (var k in obj)
        map.set(k, replace(obj[k], options))
      return map
    }
    for (var k2 in obj)
      obj[k2] = replace(obj[k2], options)
    return obj
  }
  return obj
}

module.exports = function parse(string, options) {
  var obj = JSON.parse(string)

  if (typeof options !== 'object' || options === null)
    return obj

  return replace(obj, options)
}
