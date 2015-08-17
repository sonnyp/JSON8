'use strict'

var get = require('./get')
var add = require('./add')
// var clone =

/**
 * @typedef OperationResult
 * @type Object
 * @property {Any}   doc       - The patched document
 * @property {Array} previous  - The previous/replaced value if any
 */

/**
 * Copy the value at the specified JSON Pointer location to an other location
 * http://tools.ietf.org/html/rfc6902#section-4.5
 *
 * @param  {Object|Array} doc   - JSON document to copy the value from and to
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @param  {String}       dest  - JSON Pointer string destination of the value
 * @return {OperationResult}
 */
module.exports = function copy(doc, path, dest) {
  var obj = get(doc, path)
  // return add(doc, dest, clone(obj))
  return add(doc, dest, obj)
}
