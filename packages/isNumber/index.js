'use strict'

module.exports = function isNumber(obj) {
  return (typeof obj === 'number' && isFinite(obj))
}
