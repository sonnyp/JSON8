'use strict'

/**
 * Serialize a JSON tokens list
 *
 * @param  {Array} tokens  - array of tokens
 * @return {String}        - JSON Pointer string
 */
module.exports = function serialize(tokens) {
  var pointer = ''

  for (var i = 0, len = tokens.length; i < len; i++) {
    var token = tokens[i]
    pointer += '/'
    for (var y = 0, length = token.length; y < length; y++) {
      var l = token.charAt(y)
      if (l === '~')
        pointer += '~0'
      else if (l === '/')
        pointer += '~1'
      else
        pointer += l
    }
  }

  return pointer
}
