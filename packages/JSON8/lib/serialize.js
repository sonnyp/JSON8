'use strict'

var isArray = require('./is').array
var types = require('./types')
var OBJECT = types.OBJECT
var NUMBER = types.NUMBER
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN

module.exports = function serialize(obj, spacer) {
  var type = typeof obj

  switch (type) {
    case BOOLEAN:
      return obj.toString()
    case STRING:
      return JSON.stringify(obj)
    case NUMBER:
      if (isNaN(obj) || obj === Infinity || obj === -Infinity)
        throw new TypeError(obj + ' is not a valid JSON value')
      if (obj === 0 && (1 / obj) === -Infinity)
        return '-0'
      return obj.toString()
  }

  if (obj === null)
    return 'null'

  var str = ''

  if (isArray(obj)) {
    str += '['
    for (var i = 0, l = obj.length; i < l; i++) {
      str += serialize(obj[i])
      if (i !== l - 1) str += ','
    }
    str += ']'
  }
  else if (type === OBJECT) {
    str += '{'
    var keys = Object.keys(obj)
    for (var j = 0, len = keys.length; j < len; j++) {
      var k = keys[j]
      str += JSON.stringify(obj[k]) + ':' + serialize(obj[k])
      if (j !== len - 1) str += ','
    }
    str += '}'
  }
  else {
    throw new TypeError(obj + ' is not a valid JSON value')
  }

  if (spacer)
    return JSON.stringify(JSON.parse(str), null, spacer)

  return str
}
