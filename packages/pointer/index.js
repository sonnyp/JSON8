'use strict'

var encode = require('./lib/encode')
var decode = require('./lib/decode')

module.exports.encode = encode
module.exports.serialize = encode
module.exports.decode = decode
module.exports.parse = decode
module.exports.validArrayToken = require('./lib/validArrayToken')
module.exports.walk = require('./lib/walk')
module.exports.find = require('./lib/find')
