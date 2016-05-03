'use strict'

var ooPointer = require('json8-pointer')
var encode = ooPointer.encode
var decode = ooPointer.decode

/**
 * Return the reverse operation to a JSON Patch operation
 * @param  {Object}       patch     - JSON Patch operation object
 * @param  {Any}          previous  - previous value for add and replace operations
 * @param  {Number}       idx       - index of the item for array
 * @return {Object}
 */
function reverse(patch, previous, idx) {
  var op = patch.op
  var path = patch.path

  if (op === 'copy' || (op === 'add' && previous === undefined)) {
    if (idx === undefined)
      return {"op": "remove", "path": path}

    // for item pushed to array with -
    var tokens = decode(path)
    tokens[tokens.length - 1] = idx.toString()
    return {"op": "remove", "path": encode(tokens)}
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
 * Builds and returns a valid JSON Patch from a revert value
 * @param  {Array} revert   - revert value from the apply or patch method with {reversible: true}
 * @return {Array} patches  - JSON Patch
 */
module.exports = function buildRevertPatch(revert) {
  var patch = []

  for (var i = 0, len = revert.length; i < len; i++) {
    var item = revert[i]
    patch.unshift(reverse(item[0], item[1], item[2]))
  }

  return patch
}
