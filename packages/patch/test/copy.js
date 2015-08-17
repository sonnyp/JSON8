'use strict'

import assert from 'assert'
import _copy from '../lib/copy'

describe('copy', () => {

  let doc

  const copy = function(path, dest) {
    return _copy(doc, path, dest)
  }

  describe('object location', () => {

    it('copy the primitive if the parent exists and is valid', () => {
      doc = {bar: 'foo'}
      copy('/bar', '/foo')
      assert.deepEqual(doc.bar, doc.foo)
    })

    it('copy the structure if the parent exists and is valid', () => {
      doc = {bar: {}}
      copy('/bar', '/foo')
      assert.deepEqual(doc.bar, doc.foo)
    })

    it('doesn\'t shallow copy objects', () => {
      doc = {bar: []}
      copy('/bar', '/foo')
      assert.deepEqual(doc.bar, doc.foo)
    })

    it('throws an error if the parent does not exists', () => {
      doc = {}
      assert.throws(() => {
        copy('/foo/bar', '/bar/foo')
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: 'bar'}
      assert.throws(() => {
        copy('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

  describe('array location', () => {

    it('sets the value if the parent exists and is valid', () => {
      doc = {'foo': ['bar']}
      copy('/foo/0', '/foo/1')
      assert.deepEqual(doc.foo[0], doc.foo[1])
    })

    it('throws an error if the parent does not exists', () => {
      doc = {'foo': []}
      assert.throws(() => {
        copy('/foo/0/bar', '/foo/bar')
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: true}
      assert.throws(() => {
        copy('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

})
