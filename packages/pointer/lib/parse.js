'use strict'

var isArray = require('json8').isArray

/**
 * parse a JSON Pointer string
 *
 * @param  {String} pointer  - JSON Pointer string to parse
 * @return {Array}           - array of tokens
 */
module.exports = function parse(pointer) {
  if (isArray(pointer))
    return pointer

  if (pointer.length === 0)
    return []

  if (pointer.charAt(0) !== '/')
    throw new Error('Invalid pointer: ' + pointer)

  var tokens = ['']
  var c = 0

  for (var i = 1, len = pointer.length; i < len; i++) {
    var l = pointer.charAt(i)
    if (l === '/') {
      tokens.push('')
      c++
    }
    else if (l === '~') {
      if (pointer.charAt(i + 1) === '1') {
        tokens[c] += '/'
        i++
      }
      else if (pointer.charAt(i + 1) === '0') {
        tokens[c] += '~'
        i++
      }
      else {
        tokens[c] += l
      }
    }
    else {
      tokens[c] += l
    }
  }

  return tokens
}
