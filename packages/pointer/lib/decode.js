'use strict'

/**
 * decode a JSON Pointer string
 *
 * @param  {String} pointer    - JSON Pointer string to decode
 * @param  {String} separator  - separator to use, defaults to /
 * @return {Array}             - array of tokens
 */
module.exports = function decode(pointer, separator) {
  if (Array.isArray(pointer))
    return pointer

  var sep = typeof separator === 'string' && separator.length > 0 ? separator : '/'

  if (pointer.length === 0)
    return []

  if (pointer.charAt(0) !== sep)
    throw new Error('Invalid pointer: ' + pointer)

  var tokens = ['']
  var c = 0

  for (var i = 1, len = pointer.length; i < len; i++) {
    var l = pointer.charAt(i)
    if (l === sep) {
      tokens.push('')
      c++
    }
    else if (l === '~') {
      if (pointer.charAt(i + 1) === '1') {
        tokens[c] += sep
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
