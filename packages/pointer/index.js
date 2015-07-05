'use strict'

var JSON8 = require('json8')
var isArray = JSON8.isArray
var isObject = JSON8.isObject

/**
 * parse a JSON Pointer string
 *
 * @param  {String} pointer  - JSON Pointer string to parse
 * @return {Array}           - array of tokens
 */
var parse = function(pointer) {
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

/**
 * Serialize a JSON tokens list
 *
 * @param  {Array} tokens  - array of tokens
 * @return {String}        - JSON Pointer string
 */
var serialize = function(tokens) {
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

/**
 * Check if the token is a valid array token and throws an error
 *
 * @param  {String} token        - token
 * @param  {Number} arrayLength  - array length
 */
var validArrayToken = function(token, arrayLength) {
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

/**
 * Walk a JSON document with a tokens array
 *
 * @param {Object|Array} doc     - JSON document
 * @param {Array}        tokens  - array of tokens
 * @return {Array}               - [token, parent]
 */
var walk = function(doc, tokens) {
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

/**
 * Get the value at the JSON Pointer location
 *
 * @param  {Object|Array} doc      - JSON document
 * @param  {String|Array} pointer  - JSON Pointer string or tokens array
 * @return {Any}                   - value at the JSON Pointer location - undefined otherwise
 */
var find = function(doc, pointer) {
  var tokens = isArray(pointer) ? pointer : parse(pointer)

  // returns the document
  if (tokens.length === 0)
    return doc

  var r

  try {
    r = walk(doc, tokens)
  }
  catch (e) {
    return undefined
  }

  var token = r[0]
  var parent = r[1]
  return parent[token]
}

module.exports.serialize = serialize
module.exports.parse = parse
module.exports.validArrayToken = validArrayToken
module.exports.walk = walk
module.exports.find = find
