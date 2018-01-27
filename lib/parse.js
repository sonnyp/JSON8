'use strict'

const OBJECT = require('./types').OBJECT

function replace(obj, options) {
  let i
  let l

  if (Array.isArray(obj)) {
    if (options.set === true) {
      const set = new Set()
      for (i = 0, l = obj.length; i < l; i++) set.add(replace(obj[i], options))
      return set
    }
    for (i = 0, l = obj.length; i < l; i++) obj[i] = replace(obj[i], options)
    return obj
  }

  if (typeof obj === OBJECT && obj !== null) {
    const keys = Object.keys(obj)
    let key
    if (options.map === true) {
      const map = new Map()
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i]
        map.set(key, replace(obj[key], options))
      }
      return map
    }
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i]
      obj[key] = replace(obj[key], options)
    }
    return obj
  }

  return obj
}

module.exports = function parse(string, options) {
  const obj = JSON.parse(string)

  if (typeof options !== OBJECT || options === null) return obj

  return replace(obj, options)
}
