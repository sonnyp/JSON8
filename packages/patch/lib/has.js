'use strict'

var ooPointer = require('json8-pointer')
var walk = ooPointer.walk
var decode = ooPointer.decode

/**
 * @typedef OperationResult
 * @type Object
 * @property {Any}   doc       - The patched document
 * @property {Array} previous  - The previous/replaced value if any
 */

/**
 * Check if the document as the property at the specified JSON Pointer location
 *
 * @param  {Object|Array} doc   - JSON document
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @return {Bool}
 */
module.exports = function has(doc, path) {
  var tokens = decode(path)

  // returns the document
  if (tokens.length === 0)
    return true

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  return token in parent
}
