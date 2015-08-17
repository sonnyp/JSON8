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
 * Remove the value at the JSON Pointer location
 * http://tools.ietf.org/html/rfc6902#section-4.2
 *
 * @param  {Any}          doc   - JSON document to search into
 * @param  {String|Array} path  - JSON Pointer string or tokens patch
 * @return {OperationResult}
 */
module.exports = function remove(doc, path) {
  var tokens = parse(path)

  // removes the document
  if (tokens.length === 0)
    return {doc: undefined, previous: doc}

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  var previous = parent[token]
  if (previous === undefined)
    throw new Error('Location not found')

  if (Array.isArray(parent))
    parent.splice(token, 1)
  else
    delete parent[token]

  return {doc: doc, previous: previous}
}
