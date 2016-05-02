'use strict'

/* eslint-disable no-magic-numbers */

var types = require('./types')
var OBJECT = types.OBJECT
var NUMBER = types.NUMBER
var STRING = types.STRING
var BOOLEAN = types.BOOLEAN

function stringify(obj, opts, depth) {
  if (opts.toJSON === true && typeof obj === OBJECT && obj !== null && typeof obj.toJSON === 'function')
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

  var nl = ''
  var indent = ''
  var pindent = ''
  var delimiter = ''
  var space = ''

  if (opts.indent) {
    space = ' '
    if (depth > opts.maxIndentLevel) {
      nl = ''
      delimiter = ' '
    } else {
      nl = '\n'
      delimiter = '\n'
      for (var y = 0; y < depth; y++) {
        indent += opts.indent
      }
      for (var x = 0; x < depth - 1; x++) {
        pindent += opts.indent
      }
    }
  }


  var replacer = opts.replacer
  var str = ''

  if (Array.isArray(obj)) {
    str += '['

    for (var i = 0, l = obj.length; i < l; i++) {
      var item = obj[i]
      if (replacer) {
        item = replacer.call(obj, i, item)
        if (item === undefined) {
          if (i === l - 1 && str.length > 1) str = str.slice(0, -1)
          continue
        }
      }
      if (nl && str[str.length - 1] !== nl) str += nl
      str += indent + stringify(item, opts, depth + 1)
      if (i !== l - 1) str += ',' + delimiter
      else str += nl + pindent
    }

    str += ']'
  }
  else if (global.Set && obj instanceof Set) {
    str += '['

    var n = 0
    obj.forEach(function(setItem) {
      if (replacer) {
        setItem = replacer.call(obj, setItem, setItem)
        if (setItem === undefined) {
          if (n === obj.size - 1 && str.length > 1) str = str.slice(0, -1)
          n++
          return
        }
      }
      if (n === 0) str += nl
      str += stringify(setItem, opts, depth + 1)
      if (n++ !== obj.size - 1) str += ',' + delimiter
      else str += nl + pindent
    })

    str += ']'
  }
  else if (global.Map && obj instanceof Map) {
    str += '{'

    var m = 0
    obj.forEach(function(v, k) {
      if (typeof k !== STRING)
        throw new TypeError(k + ' key is not a string')
      if (k === 'toJSON' && typeof v === 'function') return
      if (replacer) {
        v = replacer.call(obj, k, v)
        if (v === undefined) {
          if (m === obj.size - 1 && str.length > 1) str = str.slice(0, -1)
          m++
          return
        }
      }
      if (m === 0) str += nl
      str += JSON.stringify(k) + ':' + space + stringify(v, opts, depth + 1)
      if (m++ !== obj.size - 1) str += ',' + delimiter
      else str += nl + pindent
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
      if (replacer) {
        v = replacer.call(obj, k, v)
        if (v === undefined) {
          if (j === len - 1 && str.length > 1) str = str.slice(0, -1)
          continue
        }
      }
      if (nl && str[str.length - 1] !== nl) str += nl
      str += indent + JSON.stringify(k) + ':' + space + stringify(v, opts, depth + 1)
      if (j !== len - 1) str += ',' + delimiter
      else str += nl + pindent
    }

    str += '}'
  }
  else {
    throw new TypeError(obj + ' is not JSON valid')
  }

  return str
}

module.exports = function serialize(obj, options) {
  options = typeof options === 'object' && options !== null ? options : Object.create(null)
  var opts = Object.create(null)
  opts.toJSON = options.toJSON !== false
  opts.replacer = typeof options.replacer === 'function' && options.replacer

  opts.indent = ''
  if (options.space) {
    if (typeof options.space === 'number' && options.space >= 1) {
      for (var i = 0; i < options.space; i++) {
        opts.indent += ' '
      }
    } else if (typeof options.space === 'string') {
      opts.indent = options.space
    }
  }

  opts.maxIndentLevel = options.maxIndentLevel


  return stringify(obj, opts, 1)
}
