'use strict'

var isObject = require('json8-core').isObject
var isJSON = require('json8-core').isJSON
var pointer = require('json8-pointer')

/**
 * Convert a JSON Merge Patch to a JSON Patch
 * @param  {Any}   patch   - JSON Merge Patch
 * @param  {array} prefix  - tokens prefix (private)
 * @return {Array}         - JSON Patch document
 */
var toJSONPatch = function(patch, prefix) {
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
      ops.push({"op": "delete", "path": path})
    else
      ops.push({"op": "add", "path": path, "value": v})
  }

  return ops
}

module.exports = toJSONPatch
