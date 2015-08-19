'use strict'

var serialize = require('json8-pointer').serialize
var equal = require('json8/lib/equal')
var type = require('json8/lib/type')
var ARRAY = 'array'
var OBJECT = 'object'

module.exports = function diff(a, b, pre) {
  var patches = []
  var prefix = pre || []

  var at = type(a)
  var bt = type(b)

  if (bt !== at) {
    if (at === undefined)
      patches.push({"op": "add", "path": serialize(prefix), "value": b})
    else
      patches.push({"op": "replace", "path": serialize(prefix), "value": b})
    return patches
  }
  else if (bt !== ARRAY && bt !== OBJECT) {
    if (!equal(a, b))
      patches.push({"op": "replace", "path": serialize(prefix), "value": b})
    return patches
  }

  if (a === b)
    return patches

  if (Array.isArray(b)) {
    // FIXME let's be smarter about array diffing
    if (a.length === 0 && b.length === 0)
      return patches
    if (equal(a, b))
      return patches
    patches.push({"op": "replace", "path": serialize(prefix), "value": b})
  }
  else if (bt === OBJECT) {
    var i, l, keys, k
    keys = Object.keys(b)
    for (i = 0, l = keys.length; i < l; i++) {
      k = keys[i]
      patches = patches.concat(diff(a[k], b[k], prefix.concat([k])))
    }

    keys = Object.keys(a)
    for (i = 0, l = keys.length; i < l; i++) {
      k = keys[i]
      if (b[k] !== undefined)
        continue
      patches.push({"op": "remove", "path": serialize(prefix.concat([k]))})
    }
  }

  return patches
}
