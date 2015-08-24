'use strict'

/**
 * Encode a JSON tokens list
 *
 * @param  {Array}  tokens     - array of tokens
 * @param  {String} separator  - separator to use, defaults to /
 * @return {String}            - JSON Pointer string
 */
module.exports = function encode(tokens, separator) {
  var pointer = ''
  var sep = typeof separator === 'string' && separator.length > 0 ? separator : '/'

  for (var i = 0, len = tokens.length; i < len; i++) {
    var token = tokens[i]
    pointer += sep
    for (var y = 0, length = token.length; y < length; y++) {
      var l = token.charAt(y)
      if (l === '~')
        pointer += '~0'
      else if (l === sep)
        pointer += '~1'
      else
        pointer += l
    }
  }

  return pointer
}
