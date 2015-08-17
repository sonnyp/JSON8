'use strict'

var ooPointer = require('json8-pointer')
var parse = ooPointer.parse
var walk = ooPointer.walk

/**
 * @typedef OperationResult
 * @type Object
 * @property {Any}   doc       - The patched document
 * @property {Array} previous  - The previous/replaced value if any
 */

/**
 * Replace the value at the JSON Pointer location
 * http://tools.ietf.org/html/rfc6902#section-4.3
 *
 * @param  {Any}          doc    - JSON document
 * @param  {String|Array} path   - JSON Pointer string or tokens patch
 * @param  {String}       value  - JSON object to replace with
 * @return {OperationResult}
 */
module.exports = function replace(doc, path, value) {
  var tokens = parse(path)

  // replaces the document
  if (tokens.length === 0)
    return {doc: value, previous: doc}

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  var previous = parent[token]
  if (previous === undefined)
    throw new Error('Location not found')

  parent[token] = value

  return {doc: doc, previous: previous}
}
