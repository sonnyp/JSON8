'use strict'

var core = require('json8-core')
var isObject = core.isObject
var isJSON = core.isJSON
var pointer = require('json8-pointer')

/**
 * Convert a JSON Merge Patch to a JSON Patch
 * @param  {Any}   patch   - JSON Merge Patch
 * @param  {array} prefix  - tokens prefix (private)
 * @return {Array}         - JSON Patch document
 */
module.exports = function toJSONPatch(patch, prefix) {
  if (!isObject(patch)) {
    if (!isJSON(patch))
      throw new TypeError('patch argument is not a valid JSON value')

    return [{"op": "replace", "path": "", "value": patch}]
  }

  prefix = prefix || []
  var ops = []

  for (var k in patch) {
    var v = patch[k]
    var tokens = prefix.slice()
    tokens.push(k)

    if (isObject(v)) {
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
