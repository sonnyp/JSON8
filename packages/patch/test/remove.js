'use strict'

import assert from 'assert'
import operations from '../lib/operations'

describe('remove', () => {

  let doc

  const remove = function(path) {
    return operations.remove(doc, path)
  }

  describe('object location', () => {

    it('removes and returns the value if the location exists', () => {
      doc = {foo: 'bar'}
      const r = remove('/foo')
      assert.strictEqual(Object.keys(r[0]).length, 0)
      assert.strictEqual(r[1], 'bar')
    })

    it('throws an error if the location does not exists', () => {
      doc = {}
      assert.throws(() => {
        remove('/foo')
      }, Error)
    })

    it('throws an error if the path cannot be walked', () => {
      doc = {}
      assert.throws(() => {
        remove('/foo/bar')
      }, Error)
    })

  })

  describe('array location', () => {

    it('removes and returns the value if the location exists', () => {
      doc = ['bar']
      const r = remove('/0')
      assert.strictEqual(r[0].length, 0)
      assert.strictEqual(r[1], 'bar')
    })

    it('throws an error if the location does not exists', () => {
      doc = []
      assert.throws(() => {
        remove('/0')
      }, Error)
    })

    it('throws an error if the path cannot be walked', () => {
      doc = {}
      assert.throws(() => {
        remove('/foo/0')
      }, Error)
    })

  })

})
