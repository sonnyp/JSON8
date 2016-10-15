'use strict'

var _walk = require('@fuba/walk')
var join = require('./join')

module.exports = function walk (json, fn) {
  var dic = Object.create(null)

  function get(obj) {
    for (var p in dic) {
      if (dic[p] === obj) return p
    }
  }

  function set(obj, key, parent) {
    var path = join(parent ? get(parent) : parent , key)
    dic[path] = obj
  }

  _walk(json, function (v, k, p) {
    if (v !== null && typeof v === 'object') {
      if (p === undefined || k === undefined) set(v, [], '')
      else set(v, k.toString(), p)
    }

    if (k === undefined || p === undefined) {
      fn(v, '')
    } else {
      var parent = get(p)
      fn(v, join(parent, k.toString()), p, parent)
    }
  })
}
