'use strict'

module.exports = function isStructure(obj) {
  return typeof obj === 'object' && obj !== null
}
