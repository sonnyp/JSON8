'use strict'

var JSON8Pointer = require('json8-pointer')
var walk = JSON8Pointer.walk
var parse = JSON8Pointer.parse

/**
 * Get the value at the JSON Pointer location
 *
 * @param  {Object|Array} doc   - JSON document
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @return {Any}                - value at the JSON Pointer location
 */
var get = function(doc, path) {
  var tokens = parse(path)

  // returns the document
  if (tokens.length === 0)
    return doc

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  return parent[token]
}

/**
 * Check if the document as the property at the specified JSON Pointer location
 *
 * @param  {Object|Array} doc   - JSON document
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @return {Bool}
 */
var has = function(doc, path) {
  var tokens = parse(path)

  // returns the document
  if (tokens.length === 0)
    return true

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  return token in parent
}

module.exports.has = has
module.exports.get = get
