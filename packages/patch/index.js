'use strict'

var patch = require('./lib/patch')

module.exports.patch = patch.apply
module.exports.apply = patch.apply
module.exports.revert = patch.revert

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

module.exports.pack = require('./lib/pack')
module.exports.unpack = require('./lib/unpack')
