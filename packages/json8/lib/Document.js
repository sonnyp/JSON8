'use strict'

function Document(value) {
  this.value = value
}

Document.prototype.toJSON = function() {
  return this.value
}

module.exports = Document
