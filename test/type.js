import assert from 'assert'
import {type} from '..'

describe('type', () => {

  it('returns boolean for false', () => {
    assert.strictEqual(type(false), 'boolean')
  })

  it('returns boolean for true', () => {
    assert.strictEqual(type(true), 'boolean')
  })

  it('returns array for array', () => {
    assert.strictEqual(type([]), 'array')
  })

  it('returns array for set', () => {
    assert.strictEqual(type(new Set()), 'array')
  })

  it('returns null for null', () => {
    assert.strictEqual(type(null), 'null')
  })

  it('returns object for object', () => {
    assert.strictEqual(type({}), 'object')
  })

  it('returns object for map', () => {
    assert.strictEqual(type(new Map()), 'object')
  })

  it('returns number for integer', () => {
    assert.strictEqual(type(1234), 'number')
  })

  it('returns number for negative integer', () => {
    assert.strictEqual(type(-1234), 'number')
  })

  it('returns number for float', () => {
    assert.strictEqual(type(12.34), 'number')
  })

  it('returns number for negative float', () => {
    assert.strictEqual(type(-12.34), 'number')
  })

  it('returns undefined for undefined', () => {
    assert.strictEqual(type(undefined), undefined)
  })

  it('returns undefined for NaN', () => {
    assert.strictEqual(type(NaN), undefined)
  })

  it('returns undefined for Infinity', () => {
    assert.strictEqual(type(Infinity), undefined)
  })

  it('returns undefined for -Infinity', () => {
    assert.strictEqual(type(-Infinity), undefined)
  })

  it('returns undefined for function', () => {
    assert.strictEqual(type(() => {}), undefined)
  })

  if (global.Symbol && typeof Symbol() === 'symbol') {
    it('returns undefined for sybmol', () => {
      assert.strictEqual(type(Symbol()), undefined)
    })
  }
})
