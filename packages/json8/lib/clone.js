'use strict'

const types = require('./types')
const OBJECT = types.OBJECT

module.exports = function clone(obj) {
  if (typeof obj !== OBJECT || obj === null) return obj

  let c, i, l

  if (Array.isArray(obj)) {
    c = []
    for (i = 0, l = obj.length; i < l; i++) c[i] = clone(obj[i])
  } else if (global.Set && obj instanceof Set) {
    c = new Set()
    obj.forEach(function(item) {
      c.add(clone(item))
    })
  } else if (global.Map && obj instanceof Map) {
    c = new Map()
    obj.forEach(function(value, key) {
      c.set(key, clone(value))
    })
  } else {
    c = {}
    const keys = Object.keys(obj)
    for (i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      c[key] = clone(obj[key])
    }
  }

  return c
}
