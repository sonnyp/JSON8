import assert from 'assert'
import {hasValue} from '..'

const has = function(obj, value) {
  assert.deepEqual(hasValue(obj, value), true)
}

const lacks = function(obj, value) {
  assert.deepEqual(hasValue(obj, value), false)
}

describe('hasValue', () => {

  it('returns false if the obj is not an object', () => {
    lacks(null, 'foo')
  })

  describe('object', () => {
    it('returns false if value is undefined', () => {
      lacks({'foo': undefined}, undefined)
    })

    it('returns true if the value is present', () => {
      has({foo: 'bar'}, 'bar')
    })

    it('returns true if the key is undefined', () => {
      has({undefined: 'foo'}, 'foo')
    })

    it('returns false if the value lives in the prototype chain', () => {
      lacks(Object.create({foo: 'bar'}), 'bar')
    })

    it('returns true if the value is present and is an object', () => {
      has({'foo': {}}, {})
      lacks({}, {"foo": "bar"})
    })
  })

  describe('Map', () => {

    let obj
    beforeEach(() => {
      obj = new Map()
    })

    it('returns false if value is undefined', () => {
      obj.set('foo', undefined)
      lacks(obj, undefined)
    })

    it('returns true if the key is present', () => {
      obj.set('foo', 'bar')
      has(obj, 'bar')
    })

    it('returns false if the key is undefined', () => {
      obj.set(undefined, 'foo')
      lacks(obj, 'foo')
    })

    it('returns true if the value is present and is an object', () => {
      obj.set({}, {})
      has(obj, {})
      lacks(obj, {"foo": "bar"})
    })

  })

})
