'use strict'

var extras = require('./lib/extras')
var operations = require('./lib/operations')
var patch = require('./lib/patch')

var exports = {
  get: extras.get,
  has: extras.has,

  add: operations.add,
  remove: operations.remove,
  replace: operations.replace,
  move: operations.move,
  copy: operations.copy,
  test: operations.test,

  patch: patch.patch,
  apply: patch.patch,
  revert: patch.revert,
}

for (var i in exports)
  module.exports[i] = exports[i]
