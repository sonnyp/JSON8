'use strict'

var isObject = require('json8-core').isObject

/**
 * apply a JSON merge patch
 * https://tools.ietf.org/html/rfc7396
 * @param  {Object} doc    - JSON object document
 * @param  {Object} patch  - JSON object patch
 * @return {Object}        - JSON object document
 */
var patch = function(doc, patch) {
  if (!isObject(patch))
    return patch

  if (!isObject(doc))
    return {}

  for (var k in patch) {
    var v = patch[k]
    if (v === null) {
      delete doc[k]
      continue
    }
    doc[k] = patch(doc[k], v)
  }

  return doc
}

module.exports.patch = patch
