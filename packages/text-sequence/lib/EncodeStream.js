'use strict'

var inherits = require('util').inherits
var Transform = require('stream').Transform
var encode = require('./encode')

var EncodeStream = function() {
  Transform.call(this, {objectMode: true})
}
inherits(EncodeStream, Transform)

EncodeStream.prototype._transform = function(obj, enc, next) {
  next(null, encode([obj]))
}

module.exports = EncodeStream
