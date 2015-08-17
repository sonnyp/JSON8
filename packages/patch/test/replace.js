'use strict'

import assert from 'assert'
import _replace from '../lib/replace'

describe('replace', () => {

  let doc

  const replace = function(path, obj) {
    return _replace(doc, path, obj)
  }

  describe('object location', () => {

    it('replaces the value if the parent exists and is valid', () => {
      doc = {'foo': 'hello'}
      const obj = {bar: 'foo'}
      const r = replace('/foo', {bar: 'foo'})
      assert.deepEqual(r.doc.foo, obj)
    })

    it('throws an error if the parent does not exists', () => {
      doc = {}
      assert.throws(() => {
        replace('/foo/bar', {bar: 'foo'})
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: 'bar'}
      assert.throws(() => {
        replace('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

  describe('array location', () => {

    it('replaces the value if the parent exists and is valid', () => {
      doc = {'foo': ['bar']}
      const r = replace('/foo/0', 'barfoo')
      assert.deepEqual(r.doc, {foo: ['barfoo']})
    })

    it('throws an error if the parent does not exists', () => {
      doc = {'foo': []}
      assert.throws(() => {
        replace('/foo/0/bar', 'foobar')
      }, Error)
    })

    it('throws an error if the parent is not valid', () => {
      doc = {foo: true}
      assert.throws(() => {
        replace('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

})
