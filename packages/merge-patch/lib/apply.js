'use strict'

var OBJECT = 'object'

/**
 * apply a JSON merge patch
 * https://tools.ietf.org/html/rfc7396
 * @param  {Object} doc    - JSON object document
 * @param  {Object} patch  - JSON object patch
 * @return {Object}        - JSON object document
 */
module.exports = function apply(doc, patch) {
  if (typeof patch !== OBJECT || patch === null || Array.isArray(patch)) {
    return patch
  }

  if (typeof doc !== OBJECT || doc === null || Array.isArray(doc))
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
