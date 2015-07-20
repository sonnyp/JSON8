'use strict'

import assert from 'assert'
import JSON8 from '..'

const equal = function(a, b) {
  assert.strictEqual(JSON8.equal(a, b), true)
}

const differ = function(a, b) {
  assert.strictEqual(JSON8.equal(a, b), false)
}

describe('equal', () => {

  describe('array', () => {
    it('returns true for identical', () => {
      equal([1, 2], [1, 2])
      equal([], [])
      const array = []
      equal(array, array)
    })

    it('returns false for different', () => {
      differ([1, 2], [2, 1])
      differ([undefined], [undefined])
    })
  })

  if (global.Set) {
    describe('set', () => {
      it('returns true for identical', () => {
        equal(new Set(), new Set())
        equal(new Set(['foo']), new Set(['foo']))
        equal(new Set(['foo', 'bar']), new Set(['bar', 'foo']))
        const set = new Set()
        equal(set, set)
      })

      it('returns false for different', () => {
        differ(new Set(['foo']), new Set(['bar']))
        differ(new Set(['foo', 'bar']), new Set(['foo']))
      })
    })
  }

  describe('object', () => {
    it('returns true for identical', () => {
      equal({"foo": "bar"}, {"foo": "bar"})
      equal({"foo": "bar", "bar": "foo"}, {"foo": "bar", "bar": "foo"})
      equal({}, {})
      const obj = {}
      equal(obj, obj)
    })

    it('returns false for different', () => {
      differ({"foo": "bar"}, {})
      differ({"foo": "bar"}, {"bar": "foo"})
    })
  })

  if (global.Set) {
    describe('map', () => {
      it('returns true for identical', () => {
        equal(new Map(), new Map())
        const a = new Map()
        a.set('foo', 'bar')
        a.set('bar', 'foo')
        const b = new Map()
        b.set('bar', 'foo')
        b.set('foo', 'bar')
        equal(a, b)
        const map = new Map()
        equal(map, map)
      })

      it('returns false for different', () => {
        const a = new Map()
        a.set('foo', 'bar')
        const b = new Map()
        b.set('bar', 'foo')
        differ(a, b)
      })
    })
  }

  describe('boolean', () => {
    it('returns true for identical', () => {
      equal(true, true)
      equal(false, false)
    })

    it('returns false for different', () => {
      differ(true, false)
      differ(false, true)
    })
  })

  describe('number', () => {
    it('returns true for identical', () => {
      equal(42, 42)
    })

    it('returns false for different', () => {
      differ(42, 43)
    })

    // TODO: figure out what to do with those?
    // it('returns false for NaN', () => {
    //   differ(NaN, NaN)
    // })

    // it('returns false for Infinity', () => {
    //   differ(Infinity, Infinity)
    // })

    // it('returns false for -Infinity', () => {
    //   differ(-Infinity, -Infinity)
    // })
  })

  describe('string', () => {
    it('returns true for identical', () => {
      equal('foo', 'foo')
    })

    it('returns false for different', () => {
      differ('foo', 'bar')
    })
  })

  describe('null', () => {
    it('returns true for identical', () => {
      equal(null, null)
    })

    it('returns false for different', () => {
      differ(null, 'bar')
    })
  })

})
