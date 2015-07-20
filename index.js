'use strict'

var types = require('./lib/types')
var is = require('./lib/is')

module.exports.is = is

for (var k in is) {
  if (k.indexOf('is') === 0)
  module.exports[k] = is[k]
}

for (var type in types)
  module.exports[type] = types[type]

module.exports.clone = require('./lib/clone')
module.exports.type = require('./lib/type')
module.exports.equal = require('./lib/equal')
module.exports.valid = require('./lib/valid')
module.exports.serialize = require('./lib/serialize')
module.exports.parse = require('./lib/parse')
module.exports.forEach = require('./lib/forEach')
module.exports.size = require('./lib/size')
