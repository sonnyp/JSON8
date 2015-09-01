'use strict'

import assert from 'assert'
import {has as _has} from '..'

const has = function(obj, key) {
  assert.deepEqual(_has(obj, key), true)
}

const lacks = function(obj, key) {
  assert.deepEqual(_has(obj, key), false)
}

describe('has', () => {

  it('returns true if the key is present', () => {
    has({foo: 'bar'}, 'foo')
  })

  it('returns false if the obj is not an object', () => {
    lacks(null, 'foo')
  })

  it('returns false if the key is undefined', () => {
    lacks({foo: undefined}, 'foo')
  })

  it('returns false if the key lives in the prototype chain', () => {
    lacks(Object.create({foo: 'bar'}), 'foo')
  })

})
