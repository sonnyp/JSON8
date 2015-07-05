'use strict'

var JSON8 = require('json8')
var isObject = JSON8.isObject
var isJSON = JSON8.isJSON

/**
 * apply a JSON merge patch
 * https://tools.ietf.org/html/rfc7396
 * @param  {Object} doc    - JSON object document
 * @param  {Object} patch  - JSON object patch
 * @return {Object}        - JSON object document
 */
module.exports = function apply(doc, patch) {
  if (!isObject(patch)) {
    if (!isJSON(patch))
      throw new TypeError('patch argument is not a valid JSON value')

    return patch
  }

  if (!isObject(doc))
    doc = Object.create(null)

  for (var k in patch) {
    var v = patch[k]
    if (v === null) {
      delete doc[k]
      continue
    }
    doc[k] = apply(doc[k], v)
  }

  return doc
}
