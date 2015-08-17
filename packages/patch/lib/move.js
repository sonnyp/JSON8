'use strict'

var remove = require('./remove')
var add = require('./add')

/**
 * @typedef OperationResult
 * @type Object
 * @property {Any}   doc       - The patched document
 * @property {Array} previous  - The previous/replaced value if any
 */

/**
 * Move the value at the specified JSON Pointer location to an other location
 * http://tools.ietf.org/html/rfc6902#section-4.4
 *
 * @param  {Object|Array} doc   - JSON document to move the value from and to
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @param  {String}       dest  - JSON Pointer string destination of the value
 * @return {OperationResult}
 */
module.exports = function move(doc, path, dest) {
  var r = remove(doc, path)
  return add(doc, dest, r.previous)
}
