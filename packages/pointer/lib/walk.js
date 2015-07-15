'use strict'

var JSON8 = require('json8')
var isArray = JSON8.isArray
var isObject = JSON8.isObject
var validArrayToken = require('./validArrayToken')

/**
 * Walk a JSON document with a tokens array
 *
 * @param {Object|Array} doc     - JSON document
 * @param {Array}        tokens  - array of tokens
 * @return {Array}               - [token, parent]
 */
module.exports = function walk(doc, tokens) {
  var length = tokens.length

  var i = 0
  var parent = doc
  var token

  while (i < length - 1) {
    token = tokens[i++]

    if (isArray(parent))
      validArrayToken(token, parent.length)
    else if (!isObject(parent))
      throw new Error('Cannot be walked')

    parent = parent[token]
  }

  token = tokens[i]

  if (isArray(parent))
    validArrayToken(token, parent.length)
  else if (!isObject(parent))
    throw new Error('Invalid location')

  return [token, parent]
}
