'use strict'

import assert from 'assert'
import _get from '../lib/get'

describe('get', () => {

  let doc

  const get = function(path) {
    return _get(doc, path)
  }

  describe('object location', () => {

    it('returns the value if the location exists', () => {
      doc = {'foo': 'bar'}
      const r = get('/foo')
      assert.strictEqual(r, 'bar')
    })

    it('returns undefined if the location does not exists', () => {
      doc = {}
      const r = get('/foo')
      assert.strictEqual(r, undefined)
    })

    it('throws an error if the path cannot be walked', () => {
      doc = {}
      assert.throws(() => {
        get('/foo/bar')
      }, Error)
    })

  })

  describe('array location', () => {

    it('returns the value if the location exists', () => {
      doc = {'foo': ['bar']}
      const r = get('/foo/0')
      assert.strictEqual(r, 'bar')
    })

    it('returns undefined if the value does not exists', () => {
      doc = {'foo': []}
      const r = get('/foo/0')
      assert.strictEqual(r, undefined)
    })

    it('throws an error if the path cannot be walked', () => {
      doc = {'foo': []}
      assert.throws(() => {
        get('/foo/0/bar')
      }, Error)
    })

  })

})
