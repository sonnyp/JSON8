'use strict'

import assert from 'assert'
import _add from '../lib/add'

describe('add', () => {

  let doc

  const add = function(path, obj) {
    return _add(doc, path, obj)
  }

  describe('object location', () => {

    it('sets the value if the parent exists and is valid', () => {
      doc = {}
      const obj = {bar: 'foo'}
      const r = add('/foo', {bar: 'foo'})
      assert.deepEqual(r.doc.foo, obj)
    })

    it('throws an error if the parent does not exists', () => {
      doc = {}
      assert.throws(() => {
        add('/foo/bar', {bar: 'foo'})
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: 'bar'}
      assert.throws(() => {
        add('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

  describe('array location', () => {

    it('adds the value if the parent exists and is valid', () => {
      doc = {'foo': ['bar']}
      const r = add('/foo/0', 'barfoo')
      assert.deepEqual(r.doc, {foo: ['barfoo', 'bar']})
    })

    it('throws an error if the parent does not exists', () => {
      doc = {'foo': []}
      assert.throws(() => {
        add('/foo/0/bar', 'foobar')
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: true}
      assert.throws(() => {
        add('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

})
