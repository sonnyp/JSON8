'use strict'

var types = require('./types')
var OBJECT = types.OBJECT
var NUMBER = types.NUMBER
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN

// temporary workaround
// https://github.com/babel/babel/issues/2217
if (global.Map && Map.prototype.toJSON)
  delete Map.prototype.toJSON
if (global.Set && Set.prototype.toJSON)
  delete Set.prototype.toJSON

var stringify = function(obj, flags) {
  if (flags.toJSON === true && typeof obj === OBJECT && obj !== null && typeof obj.toJSON === 'function')
    obj = obj.toJSON()

  var type = typeof obj

  switch (type) {
    case BOOLEAN:
      return obj.toString()
    case STRING:
      return JSON.stringify(obj)
    case NUMBER:
      if (!isFinite(obj))
        throw new TypeError(obj + ' is not JSON valid')
      if (obj === 0 && (1 / obj) === -Infinity)
        return '-0'
      return obj.toString()
  }

  if (obj === null)
    return 'null'

  var str = ''

  if (Array.isArray(obj)) {
    str += '['
    for (var i = 0, l = obj.length; i < l; i++) {
      str += stringify(obj[i], flags)
      if (i !== l - 1) str += ','
    }
    str += ']'
  }
  else if (global.Set && obj instanceof Set) {
    str += '['
    var n = 0
    obj.forEach(function(item) {
      str += stringify(item, flags)
      if (n++ !== obj.size - 1) str += ','
    })
    str += ']'
  }
  else if (global.Map && obj instanceof Map) {
    str += '{'
    var m = 0
    obj.forEach(function(v, k) {
      if (typeof k !== STRING)
        throw new TypeError(k + ' key is not a string')
      if (k === 'toJSON' && typeof v === 'function')
        return
      str += JSON.stringify(k) + ':' + stringify(v, flags)
      if (m++ !== obj.size - 1) str += ','
    })
    str += '}'
  }
  else if (type === OBJECT) {
    str += '{'
    var keys = Object.keys(obj)
    for (var j = 0, len = keys.length; j < len; j++) {
      var k = keys[j]
      var v = obj[k]
      if (k === 'toJSON' && typeof v === 'function')
        continue
      str += JSON.stringify(k) + ':' + stringify(v, flags)
      if (j !== len - 1) str += ','
    }
    str += '}'
  }
  else {
    throw new TypeError(obj + ' is not JSON valid')
  }

  // if (typeof options === OBJECT && options.space)
    // return JSON.stringify(JSON.parse(str), null, options.space)

  return str
}

module.exports = function serialize(obj, options) {
  options = typeof options === 'object' && options !== null ? options : Object.create(null)
  var flags = Object.create(null)
  flags.toJSON = options.toJSON !== false
  return stringify(obj, flags)
}
