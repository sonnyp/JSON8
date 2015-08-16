'use strict'

if (global.Set) {
  module.exports = function isArray(obj) {
    return Array.isArray(obj) || obj instanceof Set
  }
}
else {
  module.exports = Array.isArray
}
