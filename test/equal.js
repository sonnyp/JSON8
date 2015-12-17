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
      differ([1, 2], [1, 2, 3])
      differ([1, 2, 3], [1, 2])
    })
  })

  describe('set', () => {
    it('returns true for identical', () => {
      equal(new Set(), new Set())
      equal(new Set([1]), new Set([1]))
      const set = new Set()
      equal(set, set)
    })

    it('returns false for different', () => {
      differ(new Set([1]), new Set([2]))
      differ(new Set([1, 2]), new Set([1]))
      differ(new Set([1]), new Set([1, 2]))
    })
  })

  describe('array and set', () => {
    it('returns true for identical', () => {
      equal(new Set([1, 2]), [1, 2])
      equal([1, 2], new Set([1, 2]))
    })

    it('returns false for different', () => {
      differ([1, 2], new Set([2, 1]))
      differ(new Set([1, 2]), [2, 1])
    })
  })

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

  describe('object and map', () => {
    it('returns true for identical', () => {
      equal({}, new Map())
      const a = {'foo': 'bar', 'bar': 'foo'}
      const b = new Map()
      b.set('bar', 'foo')
      b.set('foo', 'bar')
      equal(a, b)
      const map = new Map()
      equal({}, map)
    })

    it('returns false for different', () => {
      const a = {'foo': 'bar'}
      const b = new Map()
      b.set('bar', 'foo')
      differ(a, b)
    })
  })

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

    describe('0', () => {
      it('returns true for identical', () => {
        equal(0, 0)
        equal(-0, -0)
        equal(+0, +0)
        equal(+0, 0)
      })

      it('returns false for different', () => {
        differ(-0, 0)
        differ(-0, +0)
      })
    })
    // TODO: figure out what to do with those
    // it('returns false for NaN', () => {
    //   differ(NaN, NaN)
    // })

    // it('returns false for undefined', () => {
    //   differ(undefined, undefined)
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
