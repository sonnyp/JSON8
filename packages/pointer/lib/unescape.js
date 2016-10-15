'use strict'

/**
 * Unescape a JSON Pointer token
 *
 * @param  {String} token      - escaped token
 * @param  {String} separator  - separator to use, defaults to /
 * @return {String}            - unescaped token
 */
module.exports = function unescape (token, separator) {
  var sep = typeof separator === 'string' && separator.length > 0 ? separator : '/'
  return token.replace(/~0/g, '~').replace(/~1/g, sep)
}
