'use strict'

/**
 * Escape a token for use in JSON Pointer
 *
 * @param  {String} token      - array of tokens
 * @param  {String} separator  - separator to use, defaults to /
 * @return {String}            - escaped token
 */
module.exports = function escape(token, separator) {
  var sep = typeof separator === 'string' && separator.length > 0 ? separator : '/'
  var escaped = ''
  for (var i = 0, length = token.length; i < length; i++) {
    var l = token.charAt(i)
    if (l === '~')
      escaped += '~0'
    else if (l === sep)
      escaped += '~1'
    else
      escaped += l
  }
  return escaped
}
