import assert from 'assert'
import {hasKey} from '..'

const has = function(obj, key) {
  assert.deepEqual(hasKey(obj, key), true)
}

const lacks = function(obj, key) {
  assert.deepEqual(hasKey(obj, key), false)
}

describe('hasKey', () => {

  it('returns false if the obj is not an object', () => {
    lacks(null, 'foo')
  })

  describe('object', () => {
    it('returns false if key is undefined', () => {
      lacks({undefined: 'foo'}, undefined)
    })

    it('returns true if the key is present', () => {
      has({foo: 'bar'}, 'foo')
    })

    it('returns false if the key value is undefined', () => {
      lacks({foo: undefined}, 'foo')
    })

    it('returns false if the key lives in the prototype chain', () => {
      lacks(Object.create({foo: 'bar'}), 'foo')
    })

    it('returns false if the key is not a string', () => {
      lacks({false: 'foo'}, false)
    })
  })

  describe('Map', () => {

    let obj
    beforeEach(() => {
      obj = new Map()
    })

    it('returns false if key is undefined', () => {
      obj.set(undefined, 'foo')
      lacks(obj, undefined)
    })

    it('returns true if the key is present', () => {
      obj.set('foo', 'bar')
      has(obj, 'foo')
    })

    it('returns false if the key is undefined', () => {
      obj.set('foo', undefined)
      lacks(obj, 'foo')
    })

    it('returns false if the key is not a string', () => {
      obj.set({}, true)
      lacks(obj, {})
    })

  })
})
