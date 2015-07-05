'use strict'

import assert from 'assert'
import {equal} from '..'

describe('equal', () => {

  describe('array', () => {
    it('returns true for identical', () => {
      assert.deepEqual(equal([1, 2], [1, 2]), true)
    })

    it('returns false for different', () => {
      assert.deepEqual(equal([1, 2], [2, 1]), false)
    })
  })

  describe('object', () => {
    it('returns true for identical', () => {
      assert.deepEqual(equal({"foo": "bar"}, {"foo": "bar"}), true)
      assert.deepEqual(equal({"foo": "bar", "bar": "foo"}, {"foo": "bar", "bar": "foo"}), true)
      assert.deepEqual(equal({}, {}), true)
      const obj = {}
      assert.deepEqual(equal(obj, obj), true)
    })

    it('returns false for different', () => {
      assert.deepEqual(equal({"foo": "bar"}, {}), false)
      assert.deepEqual(equal({"foo": "bar"}, {"bar": "foo"}), false)
    })
  })

  describe('boolean', () => {
    it('returns true for identical', () => {
      assert.deepEqual(equal(true, true), true)
      assert.deepEqual(equal(false, false), true)
    })

    it('returns false for different', () => {
      assert.deepEqual(equal(true, false), false)
      assert.deepEqual(equal(false, true), false)
    })
  })

  describe('number', () => {
    it('returns true for identical', () => {
      assert.deepEqual(equal(42, 42), true)
    })

    it('returns false for different', () => {
      assert.deepEqual(equal(42, 43), false)
    })
  })

  describe('string', () => {
    it('returns true for identical', () => {
      assert.deepEqual(equal('foo', 'foo'), true)
    })

    it('returns false for different', () => {
      assert.deepEqual(equal('foo', 'bar'), false)
    })
  })

  describe('null', () => {
    it('returns true for identical', () => {
      assert.deepEqual(equal(null, null), true)
    })

    it('returns false for different', () => {
      assert.deepEqual(equal(null, 'bar'), false)
    })
  })

})
