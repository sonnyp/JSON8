'use strict'

var types = require('./lib/types')

exports.clone = require('./lib/clone')
exports.equal = require('./lib/equal')
exports.has = require('./lib/has')

exports.is = require('./lib/is')
exports.isArray = require('./lib/isArray')
exports.isBoolean = require('./lib/isBoolean')
exports.isJSON = require('./lib/isJSON')
exports.isNull = require('./lib/isNull')
exports.isNumber = require('./lib/isNumber')
exports.isObject = require('./lib/isObject')
exports.isPrimitive = require('./lib/isPrimitive')
exports.isString = require('./lib/isString')
exports.isStructure = require('./lib/isStructure')

exports.parse = require('./lib/parse')
exports.serialize = require('./lib/serialize')
exports.type = require('./lib/type')
for (var type in types)
  module.exports[type] = types[type]
exports.valid = require('./lib/valid')
