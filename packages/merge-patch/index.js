'use strict'

var apply = require('./lib/apply')
module.exports.apply = apply
module.exports.patch = apply

try {
  module.exports.toJSONPatch = require('./lib/toJSONPatch')
}
catch (e) {} // eslint-disable-line no-empty
