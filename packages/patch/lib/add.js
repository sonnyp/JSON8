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
 * Add the value to the specified JSON Pointer location
 * http://tools.ietf.org/html/rfc6902#section-4.1
 *
 * @param  {Any}  doc    - JSON document to set the value to
 * @param  {Path} path   - JSON Pointer string or tokens path
 * @param  {Any}  value  - value to add
 * @return {OperationResult}
 */
module.exports = function add(doc, path, value) {
  var tokens = parse(path)

  // replaces the document
  if (tokens.length === 0)
    return {doc: value, previous: doc}

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  var previous
  var idx

  if (Array.isArray(parent)) {
    if (token === '-') {
      parent.push(value)
      idx = parent.length - 1
    }
    else
      parent.splice(token, 0, value)
  }
  else {
    previous = parent[token]
    parent[token] = value
  }

  return {doc: doc, previous: previous, idx: idx}
}
