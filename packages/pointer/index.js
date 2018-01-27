'use strict'

var encode = require('./lib/encode')
var decode = require('./lib/decode')

module.exports.context = require('./lib/context')
module.exports.decode = decode
module.exports.dict = require('./lib/dict')
module.exports.serialize = encode
module.exports.encode = encode
module.exports.escape = require('./lib/escape')
module.exports.parse = decode
module.exports.find = require('./lib/find')
module.exports.flatten = require('./lib/flatten')
module.exports.index = require('./lib/index')
module.exports.join = require('./lib/join')
module.exports.unescape = require('./lib/unescape')
module.exports.unflatten = require('./lib/unflatten')
module.exports.validArrayToken = require('./lib/validArrayToken')
module.exports.compile = require('./lib/compile')
