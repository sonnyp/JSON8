'use strict'

var pointer = require('json8-pointer')
var parse = pointer.parse
var walk = pointer.walk
var core = require('json8-core')
var isArray = core.isArray
var clone = core.clone
var equal = core.equal
var get = require('./extras').get

/**
 * Add the value to the specified JSON Pointer location
 * http://tools.ietf.org/html/rfc6902#section-4.1
 *
 * @param  {Object|Array} doc    - JSON document to set the value to
 * @param  {Path}         path   - JSON Pointer string or tokens path
 * @param  {Any}          value  - value to add
 * @return {Array}               - [document, replaced value]
 */
var add = function(doc, path, value) {
  var tokens = parse(path)

  // replaces the document
  if (tokens.length === 0)
    return [value, doc]

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  var old
  var idx

  if (isArray(parent)) {
    if (token === '-') {
      parent.push(value)
      idx = parent.length - 1
    }
    else
      parent.splice(token, 0, value)
  }
  else {
    old = parent[token]
    parent[token] = value
  }

  return [doc, old, idx]
}

/**
 * Remove the value at the JSON Pointer location
 * http://tools.ietf.org/html/rfc6902#section-4.2
 *
 * @param  {Object|Array} doc   - JSON document to search into
 * @param  {String|Array} path  - JSON Pointer string or tokens patch
 * @return {Array}              - [document, removed value]
 */
var remove = function(doc, path) {
  var tokens = parse(path)

  // removes the document
  if (tokens.length === 0)
    return [undefined, doc]

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  var old = parent[token]
  if (old === undefined)
    throw new Error('Location not found')

  if (isArray(parent))
    parent.splice(token, 1)
  else
    delete parent[token]

  return [doc, old]
}

/**
 * Replace the value at the JSON Pointer location
 * http://tools.ietf.org/html/rfc6902#section-4.3
 *
 * @param  {Object|Array} doc    - JSON document
 * @param  {String|Array} path   - JSON Pointer string or tokens patch
 * @param  {String}       value  - JSON object to replace with
 * @return {Array}               - [document, replaced value]
 */
var replace = function(doc, path, value) {
  var tokens = parse(path)

  // replaces the document
  if (tokens.length === 0)
    return [value, doc]

  var r = walk(doc, tokens)
  var token = r[0]
  var parent = r[1]

  var old = parent[token]
  if (old === undefined)
    throw new Error('Location not found')

  parent[token] = value

  return [doc, old]
}

/**
 * Move the value at the specified JSON Pointer location to an other location
 * http://tools.ietf.org/html/rfc6902#section-4.4
 *
 * @param  {Object|Array} doc   - JSON document to move the value from and to
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @param  {String} dest        - JSON Pointer string destination of the value
 * @return {Array}              - [document, replaced value]
 */
var move = function(doc, path, dest) {
  var r = remove(doc, path)
  return add(doc, dest, r[1])
}

/**
 * Copy the value at the specified JSON Pointer location to an other location
 * http://tools.ietf.org/html/rfc6902#section-4.5
 *
 * @param  {Object|Array} doc   - JSON document to copy the value from and to
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @param  {String} dest        - JSON Pointer string destination of the value
 * @return {Array}              - [document, replaced value]
 */
var copy = function(doc, path, dest) {
  var obj = get(doc, path)
  return add(doc, dest, clone(obj))
}

/**
 * Test that the value at the specified JSON Pointer location is equal to the specified value
 * http://tools.ietf.org/html/rfc6902#section-4.6
 *
 * @param  {Object|Array} doc   - JSON document to copy the value from and to
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @param  {String} value       - the value to compare with
 * @return {Boolean}
 */
var test = function(doc, path, value) {
  var obj = get(doc, path)
  if (!equal(obj, value))
    throw new Error('Test failed')

  return [doc]
}

module.exports.add = add
module.exports.remove = remove
module.exports.replace = replace
module.exports.move = move
module.exports.copy = copy
module.exports.test = test
