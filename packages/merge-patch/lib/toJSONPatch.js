'use strict'

var JSON8 = require('json8')
var OBJECT = JSON8.OBJECT
var isJSON = JSON8.isJSON
var pointer = require('json8-pointer')

/**
 * Convert a JSON Merge Patch to a JSON Patch
 * @param  {Any}   patch   - JSON Merge Patch
 * @param  {array} prefix  - tokens prefix (private)
 * @return {Array}         - JSON Patch document
 */
module.exports = function toJSONPatch(patch, prefix) {
  if (typeof patch !== OBJECT || patch === null || Array.isArray(patch)) {
    if (!isJSON(patch))
      throw new TypeError(patch + ' is not JSON valid')

    return [{"op": "replace", "path": "", "value": patch}]
  }

  prefix = prefix || []
  var ops = []

  for (var k in patch) {
    var v = patch[k]
    var tokens = prefix.slice()
    tokens.push(k)

    if (typeof v === OBJECT && v !== null && !Array.isArray(v)) {
      ops = ops.concat(toJSONPatch(v, tokens))
      continue
    }

    var path = pointer.serialize(tokens)

    if (v === null)
      ops.push({"op": "remove", "path": path})
    else
      ops.push({"op": "add", "path": path, "value": v})
  }

  return ops
}
