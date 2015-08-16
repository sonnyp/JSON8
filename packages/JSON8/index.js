'use strict'

var types = require('./lib/types')

module.exports.clone = require('./lib/clone')
module.exports.equal = require('./lib/equal')

module.exports.is = require('./lib/is')
module.exports.isArray = require('./lib/isArray')
module.exports.isBoolean = require('./lib/isBoolean')
module.exports.isJSON = require('./lib/isJSON')
module.exports.isNull = require('./lib/isNull')
module.exports.isNumber = require('./lib/isNumber')
module.exports.isObject = require('./lib/isObject')
module.exports.isPrimitive = require('./lib/isPrimitive')
module.exports.isString = require('./lib/isString')
module.exports.isStructure = require('./lib/isStructure')

module.exports.parse = require('./lib/parse')
module.exports.serialize = require('./lib/serialize')
module.exports.type = require('./lib/type')
for (var type in types)
  module.exports[type] = types[type]
module.exports.valid = require('./lib/valid')
