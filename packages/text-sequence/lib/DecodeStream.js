'use strict'

var inherits = require('util').inherits
var Transform = require('stream').Transform
var decode = require('./decode')

var chars = require('./chars')
var RS = chars.RS
var LF = chars.LS
var CAN = chars.CAN

var DecodeStream = function() {
  Transform.call(this, {objectMode: true, decodeStrings: false})
  this.seq = ''
}
inherits(DecodeStream, Transform)

DecodeStream.prototype._transform = function(data, enc, done) {
  if (data instanceof Buffer) data = data.toString()
  for (var i = 0, l = data.length; i < l; i++) {
    if (data[i] === RS) {
      this.seq = ''
    }
    else if (data[i] === CAN) {
      this.push(JSON.parse(this.seq))
      this.seq = ''
    }
    else if (data[i] === LF) {
      this.push(JSON.parse(this.seq))
      this.seq = ''
    }
    else {
      this.seq += data[i]
    }
  }
  done()
}

module.exports = DecodeStream
