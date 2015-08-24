'use strict'

var decode = require('./decode')
var walk = require('./walk')

/**
 * Get the value at the JSON Pointer location
 *
 * @param  {Object|Array} doc      - JSON document
 * @param  {String|Array} pointer  - JSON Pointer string or tokens array
 * @return {Any}                   - value at the JSON Pointer location - undefined otherwise
 */
module.exports = function find(doc, pointer) {
  var tokens = Array.isArray(pointer) ? pointer : decode(pointer)

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
