'use strict'

import assert from 'assert'
import _move from '../lib/move'

describe('move', () => {

  let doc

  const move = function(path, dest) {
    return _move(doc, path, dest)
  }

  describe('object location', () => {

    it('moves the object if the parent exists and is valid', () => {
      doc = {bar: 'foo'}
      move('/bar', '/foo')
      assert.equal(doc.bar, undefined)
      assert.deepEqual(doc.foo, 'foo')
    })

    it('throws an error if the parent does not exists', () => {
      doc = {}
      assert.throws(() => {
        move('/foo/bar', '/bar/foo')
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: 'bar'}
      assert.throws(() => {
        move('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

  describe('array location', () => {

    it('sets the value if the parent exists and is valid', () => {
      doc = {'foo': ['bar']}
      move('/foo/0', '/hello')
      assert.equal(doc.foo[0], undefined)
      assert.equal(doc.hello, 'bar')
    })

    it('throws an error if the parent does not exists', () => {
      doc = {'foo': []}
      assert.throws(() => {
        move('/foo/0/bar', '/foo/bar')
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: true}
      assert.throws(() => {
        move('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

})
