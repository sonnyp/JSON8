'use strict'

/**
 * Check if the token is a valid array token and throws an error
 *
 * @param  {String} token        - token
 * @param  {Number} arrayLength  - array length
 */
module.exports = function validArrayToken(token, arrayLength) {
  if (token === '-')
    return

  var error = new Error('Invalid pointer')
  var length = token.length

  if (length > 1 && token[0] === '0')
    throw error

  for (var i = 0; i < length; i++) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(token[i]) === -1)
      throw error
  }

  var idx = +token

  if (idx < 0)
    throw error

  if (idx > arrayLength)
    throw error
}
