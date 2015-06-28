'use strict'

var assert = require('assert')
var operations = require('../lib/operations')

describe('move', function() {

  var doc

  var move = function(path, dest) {
    return operations.move(doc, path, dest)
  }

  describe('object location', function() {

    it('moves the object if the parent exists and is valid', function() {
      doc = {bar: 'foo'}
      move('/bar', '/foo')
      assert.equal(doc.bar, undefined)
      assert.deepEqual(doc.foo, 'foo')
    })

    it('throws an error if the parent does not exists', function() {
      doc = {}
      assert.throws(function() {
        move('/foo/bar', '/bar/foo')
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: 'bar'}
      assert.throws(function() {
        move('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

  describe('array location', function() {

    it('sets the value if the parent exists and is valid', function() {
      doc = {'foo': ['bar']}
      move('/foo/0', '/hello')
      assert.equal(doc.foo[0], undefined)
      assert.equal(doc.hello, 'bar')
    })

    it('throws an error if the parent does not exists', function() {
      doc = {'foo': []}
      assert.throws(function() {
        move('/foo/0/bar', '/foo/bar')
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: true}
      assert.throws(function() {
        move('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

})
