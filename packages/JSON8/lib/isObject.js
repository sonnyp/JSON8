'use strict'

var isArray = require('./isArray')
var OBJECT = require('./types').OBJECT

if (global.Map) {
  module.exports = function isObject(obj) {
    return (obj instanceof Map || typeof obj === OBJECT && obj !== null && !isArray(obj))
  }
}
else {
  module.exports = function isObject(obj) {
    return typeof obj === OBJECT && obj !== null && !isArray(obj)
  }
}
