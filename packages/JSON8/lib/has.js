'use strict'

var OBJECT = require('./types').OBJECT
var hasOwnProperty = Object.prototype.hasOwnProperty

module.exports = function has(obj, key) {
  return typeof obj === OBJECT && obj !== null && hasOwnProperty.call(obj, key) && obj[key] !== undefined
}
