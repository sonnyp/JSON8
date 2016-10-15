'use strict'

var decode = require('./decode')
var context = require('./context')

module.exports = function unflatten (indexes) {
  var keys = Object.keys(indexes)
  var json = indexes['']
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (key === '') continue
    var idx = decode(key)
    var res = context(json, idx)
    var target = res[1]
    var token = res[0]
    if (typeof Map !== 'undefined' && target instanceof Map) {
      target.set(token, indexes[key])
    } else if (typeof Set !== 'undefined' && target instanceof Set) {
      target.add(indexes[key])
    } else if (Array.isArray(target)) {
      target.push(indexes[key])
    } else {
      target[token] = indexes[key]
    }
  }
  return json
}
