'use strict';

var walk = require('./walk')

module.exports = function index (json) {
  var idxs = Object.create(null)
  walk(json, function (value, pointer) {
    var v
    if (Array.isArray(value)) {
      v = []
    } else if (global.Map && value instanceof Map) {
      v = new Map()
    } else if (global.Set && value instanceof Set) {
      v = new Set()
    } else if (typeof value === 'object' && value !== null) {
      v = {}
    } else {
      v = value
    }
    idxs[pointer] = v
  })
  return idxs
}
