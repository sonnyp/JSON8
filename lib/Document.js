'use strict'

var Document = function(value) {
  this.value = value // eslint-disable-line no-invalid-this
}

Document.prototype.toJSON = function() {
  return this.value
}

module.exports = Document
