import assert from 'assert'
import find from '../lib/find'

describe('trailing slash', () => {
  describe('/ with object', () => {
    it('returns the value with an empty key', () => {
      const doc = {"": "bar"}
      assert.equal(find(doc, '/'), 'bar')
    })

    it('returns undefined if the target does not have an empty key', () => {
      const doc = {"foo": "bar"}
      assert.equal(find(doc, '/'), undefined)
    })
  })

  describe('/ with array', () => {
    it('returns undefined', () => {
      const doc = [0, 1]
      assert.equal(find(doc, '/'), undefined)
    })
  })

  describe('/foo/ with object', () => {
    it('returns the value with an empty key', () => {
      const doc = {"foo": {"": "bar"}}
      assert.equal(find(doc, '/foo/'), 'bar')
    })

    it('returns undefined if the target does not have an empty key', () => {
      const doc = {"foo": {"foo": "bar"}}
      assert.equal(find(doc, '/foo/'), undefined)
    })
  })

  describe('/foo/ with array', () => {
    it('returns undefined', () => {
      const doc = {"foo": [0, 1]}
      assert.equal(find(doc, '/foo/'), undefined)
    })
  })
})
