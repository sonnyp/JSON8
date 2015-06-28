'use strict'

var pointer = require('json8-pointer')
var parse = pointer.parse
var serialize = pointer.serialize
var isArray = require('json8-core').isArray
var operations = require('./operations')

/**
 * Apply a single JSON Patch operation object to a JSON document
 * @param  {Object|Array} doc    - JSON document to apply the patch to
 * @param  {Object}       patch  - JSON Patch operation object
 * @return {void}
 */
var run = function(doc, patch) {
  if (typeof patch.path === 'string')
    var pathTokens = parse(patch.path)
  if (typeof patch.from === 'string')
    var fromTokens = parse(patch.from)

  switch (patch.op) {
    case 'add':
    case 'replace':
    case 'test':
      if (patch.value === undefined)
        throw new Error('Missing value parameter')
      return operations[patch.op](doc, pathTokens, patch.value)

    case 'move':
    case 'copy':
      return operations[patch.op](doc, fromTokens, pathTokens)

    case 'remove':
      return operations[patch.op](doc, pathTokens)
  }

  throw new Error(patch.op + ' isn\'t a valid operation')
}

/**
 * Return the reverse operation to a JSON Patch operation
 * @param  {Object}       patch     - JSON Patch operation object
 * @param  {Any}          previous  - previous value for add and replace operations
 * @param  {Number}       idx       - index of the item for array
 * @return {void}
 */
var reverse = function(patch, previous, idx) {
  var op = patch.op
  var path = patch.path

  if (op === 'copy' || (op === 'add' && previous === undefined)) {
    if (idx === undefined)
      return {"op": "remove", "path": path}

    // for item pushed to array with -
    var tokens = parse(path)
    tokens[tokens.length - 1] = idx.toString()
    return {"op": "remove", "path": serialize(tokens)}
  }
  if (op === 'replace')
    return {"op": "replace", "path": path, "value": previous}
  if (op === 'move')
    return {"op": "move", "path": patch.from, "from": path}
  if (op === 'add' || op === 'remove')
    return {"op": "add", "path": path, "value": previous}
  if (op === 'test')
    return {"op": "test", "path": path, "value": patch.value}
}

/**
 * Apply a JSON Patch to a JSON document
 * @param  {Object|Array} doc             - JSON document to apply the patch to
 * @param  {Array}        patch           - JSON Patch array
 * @param  {Object}       options         - options
 * @param  {Boolean}      options.revert  - return an array to revert
 * @return {void}
 */
var patch = function(doc, patch, options) {
  if (!isArray(patch))
    throw new Error('Invalid argument, patch must be an array')

  var done = []

  for (var i = 0, len = patch.length; i < len; i++) {
    var p = patch[i]
    var r

    try {
      r = run(doc, p)
    }
    catch (err) {
      revert(doc, done)
      throw err
    }

    doc = r[0]
    done.push([p, r[1], r[2]])
  }

  if (options && options.revert)
    return [doc, done]

  return doc
}

/**
 * Return an object that can be use with revert
 * @param  {Array} items    - array of [patch, previous, idx] items
 * @return {Array} patches  - JSON Patch array
 */
var foo = function(items) {
  var patches = []

  for (var i = 0, len = items.length; i < len; i++) {
    var item = items[i]
    patches.unshift(reverse(item[0], item[1], item[2]))
  }

  return patches
}

/**
 * Revert apply a JSON Patch
 * @param  {Object|Array} doc    - JSON document to which the patch was applied to
 * @param  {Array}        items  - array of [patch, previous, idx] items
 * @return {void}
 */
var revert = function(doc, items) {
  var patches = foo(items)
  return patch(doc, patches)
}

module.exports.foo = foo
module.exports.patch = patch
module.exports.revert = revert
module.exports.reverse = reverse
