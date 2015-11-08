'use strict'

/**
 * Check if the token is a valid array token and throws an error
 *
 * @param  {String} token        - token
 * @param  {Number} arrayLength  - array length
 * @return {undefined}
 */
module.exports = function validArrayToken(token, arrayLength) {
  if (token === '-') return

  var error = new Error('Invalid pointer')
  var length = token.length

  if (length > 1 && token[0] === '0')
    throw error

  var idx = +token

  if (isNaN(idx))
    throw error

  if (Math.abs(idx).toString() !== token)
    throw error

  if (idx < 0)
    throw error

  if (idx > arrayLength)
    throw error
}
