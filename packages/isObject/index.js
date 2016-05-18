'use strict'

var isArray = require('json8-isArray')
var OBJECT = 'object'

module.exports = (global.Map
  ? function isObject(obj) {
    return (obj instanceof Map || typeof obj === OBJECT && obj !== null && !isArray(obj))
  }
  : function isObject(obj) {
    return typeof obj === OBJECT && obj !== null && !isArray(obj)
  }
)
