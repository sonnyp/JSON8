'use strict'

var assert = require('assert')
var extras = require('../lib/extras')

describe('has', function() {

  var doc

  var has = function(path) {
    return extras.has(doc, path)
  }

  describe('object location', function() {

    it('returns true if there is a value at the specified location', function() {
      doc = {'foo': 'bar'}
      var r = has('/foo')
      assert.strictEqual(r, true)
    })

    it('returns false if there is no value at the specified location', function() {
      doc = {}
      var r = has('/foo')
      assert.strictEqual(r, false)
    })

    it('throws an error if the path cannot be walked', function() {
      doc = {}
      assert.throws(function() {
        has('/foo/bar')
      }, Error)
    })

  })

  describe('array location', function() {

    it('returns true if there is a value at the specified location', function() {
      doc = {'foo': ['bar']}
      var r = has('/foo/0')
      assert.strictEqual(r, true)
    })

    it('returns false if there is no value at the specified location', function() {
      doc = {'foo': []}
      var r = has('/foo/0')
      assert.strictEqual(r, false)
    })

    it('throws an error if the path cannot be walked', function() {
      doc = {'foo': []}
      assert.throws(function() {
        has('/foo/0/bar')
      }, Error)
    })

  })

})
