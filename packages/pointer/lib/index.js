'use strict'

var walk = require('./walk')

module.exports = function index (json) {
  var idxs = Object.create(null)
  walk(json, function (value, pointer) {
    idxs[pointer] = value
  })
  return idxs
}
