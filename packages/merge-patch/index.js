'use strict'

var apply = require('./lib/apply')
module.exports.apply = apply
module.exports.patch = apply
module.exports.diff = require('./lib/diff')

try {
  module.exports.toJSONPatch = require('./lib/toJSONPatch')
}
catch (e) {} // eslint-disable-line no-empty

module.exports.MEDIATYPE = 'application/merge-patch+json'
