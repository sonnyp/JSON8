'use strict'

var apply = require('./lib/apply')

module.exports.diff = require('./lib/diff')
module.exports.valid = require('./lib/valid')

// Patching
module.exports.patch = apply
module.exports.apply = apply

// Reverting
module.exports.revert = require('./lib/revert')
module.exports.buildRevertPatch = require('./lib/buildRevertPatch')

// Operations
module.exports.add = require('./lib/add')
module.exports.copy = require('./lib/copy')
module.exports.move = require('./lib/move')
module.exports.remove = require('./lib/remove')
module.exports.replace = require('./lib/replace')
module.exports.test = require('./lib/test')

// Extra operations
module.exports.get = require('./lib/get')
module.exports.has = require('./lib/has')

// Packing
module.exports.pack = require('./lib/pack')
module.exports.unpack = require('./lib/unpack')

// Utilities
module.exports.concat = require('./lib/concat')
