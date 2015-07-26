'use strict'

var validArrayToken = require('./validArrayToken')
var OBJECT = 'object'

/**
 * Walk a JSON document with a tokens array
 *
 * @param {Object|Array} doc     - JSON document
 * @param {Array}        tokens  - array of tokens
 * @return {Array}               - [token, target]
 */
module.exports = function walk(doc, tokens) {
  var length = tokens.length

  var i = 0
  var target = doc
  var token

  while (i < length - 1) {
    token = tokens[i++]

    if (Array.isArray(target))
      validArrayToken(token, target.length)
    else if (typeof target !== OBJECT || target === null)
      throw new Error('Cannot be walked')

    target = target[token]
  }

  token = tokens[i]

  if (Array.isArray(target))
    validArrayToken(token, target.length)
  else if (typeof target !== OBJECT || target === null)
    throw new Error('Invalid target')

  return [token, target]
}
