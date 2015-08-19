'use strict'

var get = require('./get')
var equal = require('json8/lib/equal')

/**
 * @typedef OperationResult
 * @type Object
 * @property {Any}   doc       - The patched document
 * @property {Array} previous  - The previous/replaced value if any
 */

/**
 * Test that the value at the specified JSON Pointer location is equal to the specified value
 * http://tools.ietf.org/html/rfc6902#section-4.6
 *
 * @param  {Object|Array} doc    - JSON document to copy the value from and to
 * @param  {String|Array} path   - JSON Pointer string or tokens path
 * @param  {String}       value  - the value to compare with
 * @return {OperationResult}
 */
module.exports = function test(doc, path, value) {
  var obj = get(doc, path)
  if (!equal(obj, value))
    throw new Error('Test failed')

  return {doc: doc}
}
