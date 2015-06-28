'use strict'

var assert = require('assert')
var operations = require('../lib/operations')

describe('add', function() {

  var doc

  var add = function(path, obj) {
    return operations.add(doc, path, obj)
  }

  describe('object location', function() {

    it('sets the value if the parent exists and is valid', function() {
      doc = {}
      var obj = {bar: 'foo'}
      var r = add('/foo', {bar: 'foo'})
      assert.deepEqual(r[0].foo, obj)
    })

    it('throws an error if the parent does not exists', function() {
      doc = {}
      assert.throws(function() {
        add('/foo/bar', {bar: 'foo'})
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: 'bar'}
      assert.throws(function() {
        add('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

  describe('array location', function() {

    it('adds the value if the parent exists and is valid', function() {
      doc = {'foo': ['bar']}
      var r = add('/foo/0', 'barfoo')
      assert.deepEqual(r[0], {foo: ['barfoo', 'bar']})
    })

    it('throws an error if the parent does not exists', function() {
      doc = {'foo': []}
      assert.throws(function() {
        add('/foo/0/bar', 'foobar')
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: true}
      assert.throws(function() {
        add('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

})
