'use strict'

module.exports = !global.Set ? Array.isArray : function isArray(obj) {
  return Array.isArray(obj) || obj instanceof Set
}
