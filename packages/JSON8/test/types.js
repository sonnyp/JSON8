'use strict'

import assert from 'assert'
import types from '../lib/types'

describe('types', () => {

  it('has an OBJECT property set to \'object\'', () => {
    assert.strictEqual(types.OBJECT, 'object')
  })

  it('has a STRING property set to \'string\'', () => {
    assert.strictEqual(types.STRING, 'string')
  })

  it('has a NUMBER property set to \'number\'', () => {
    assert.strictEqual(types.NUMBER, 'number')
  })

  it('has a NULL property set to \'null\'', () => {
    assert.strictEqual(types.NULL, 'null')
  })

  it('has an ARRAY property set to \'array\'', () => {
    assert.strictEqual(types.ARRAY, 'array')
  })

  it('has an BOOLEAN property set to \'boolean\'', () => {
    assert.strictEqual(types.BOOLEAN, 'boolean')
  })

})
