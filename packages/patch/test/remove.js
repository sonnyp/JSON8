'use strict'

var assert = require('assert')
var operations = require('../lib/operations')

describe('remove', function() {

  var doc

  var remove = function(path) {
    return operations.remove(doc, path)
  }

  describe('object location', function() {

    it('removes and returns the value if the location exists', function() {
      doc = {foo: 'bar'}
      var r = remove('/foo')
      assert.strictEqual(Object.keys(r[0]).length, 0)
      assert.strictEqual(r[1], 'bar')
    })

    it('throws an error if the location does not exists', function() {
      doc = {}
      assert.throws(function() {
        remove('/foo')
      }, Error)
    })

    it('throws an error if the path cannot be walked', function() {
      doc = {}
      assert.throws(function() {
        remove('/foo/bar')
      }, Error)
    })

  })

  describe('array location', function() {

    it('removes and returns the value if the location exists', function() {
      doc = ['bar']
      var r = remove('/0')
      assert.strictEqual(r[0].length, 0)
      assert.strictEqual(r[1], 'bar')
    })

    it('throws an error if the location does not exists', function() {
      doc = []
      assert.throws(function() {
        remove('/0')
      }, Error)
    })

    it('throws an error if the path cannot be walked', function() {
      doc = {}
      assert.throws(function() {
        remove('/foo/0')
      }, Error)
    })

  })

})
