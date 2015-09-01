'use strict'

var types = require('./lib/types')
var Document = require('./lib/Document')

var oo = module.exports = function(doc) {
  return new Document(doc)
}

oo.clone = require('./lib/clone')
oo.Document = Document
oo.equal = require('./lib/equal')

oo.has = require('./lib/has')
oo.hasKey = require('./lib/hasKey')
oo.hasValue = require('./lib/hasValue')

oo.is = require('./lib/is')
oo.isArray = require('./lib/isArray')
oo.isBoolean = require('./lib/isBoolean')
oo.isJSON = require('./lib/isJSON')
oo.isNull = require('./lib/isNull')
oo.isNumber = require('./lib/isNumber')
oo.isObject = require('./lib/isObject')
oo.isPrimitive = require('./lib/isPrimitive')
oo.isString = require('./lib/isString')
oo.isStructure = require('./lib/isStructure')

oo.parse = require('./lib/parse')
oo.serialize = require('./lib/serialize')
oo.type = require('./lib/type')
for (var type in types)
  oo[type] = types[type]
oo.valid = require('./lib/valid')
