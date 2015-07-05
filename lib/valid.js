'use strict'

var types = require('./types')
var ARRAY = types.ARRAY
var OBJECT = types.OBJECT
var type = require('./type')
var isJSON = require('./is').JSON

module.exports = function valid(obj) {
  var t = type(obj)
  if (!t)
    return false

  if (t === ARRAY) {
    for (var i = 0, l = obj.length; i < l; i++)
      if (!isJSON(obj[i])) return false
  }
  else if (t === OBJECT) {
    for (var k in obj)
      if (!isJSON(obj[k])) return false
  }

  return true
}
