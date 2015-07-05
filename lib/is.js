'use strict'

var types = require('./types')
var NUMBER = types.NUMBER
var OBJECT = types.OBJECT
var BOOLEAN = types.BOOLEAN
var STRING = types.STRING

/*
 * primitives
 */
module.exports.primitive = function(obj) {
  if (obj === null)
    return true

  var type = typeof obj
  if (type === NUMBER && !(isNaN(obj) || obj === Infinity || obj === -Infinity))
    return true

  return (type === 'boolean' || type === 'string' || obj === null)
}

module.exports.boolean = function(obj) {
  return typeof obj === BOOLEAN
}

module.exports.string = function(obj) {
  return typeof obj === STRING
}

module.exports.null = function(obj) {
  return obj === null
}

module.exports.number = function(obj) {
  return (typeof obj === NUMBER && !(isNaN(obj) || obj === Infinity || obj === -Infinity))
}
/**/

/*
 * structures
 */
module.exports.structure = function(obj) {
  return typeof obj === OBJECT && obj !== null
}

var isArray = module.exports.array = Array.isArray

module.exports.object = function(obj) {
  return typeof obj === OBJECT && obj !== null && !isArray(obj)
}
/*/

/*
 * JSON
 */
module.exports.JSON = function(obj) {
  var type = typeof obj

  if (type === NUMBER)
    return !(isNaN(obj) || obj === Infinity || obj === -Infinity)

  return type === BOOLEAN || type === STRING || type === OBJECT
}
/**/

for (var k in module.exports) {
  var capitalized = k[0].toUpperCase() + k.slice(1)
  var fn = module.exports[k]
  module.exports['is' + capitalized] = fn
  module.exports[k] = fn
}

module.exports.is = function is(obj, type) {
  return module.exports[type](obj)
}
