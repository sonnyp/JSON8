import assert from 'assert'
import {flatten, unflatten} from '..'
import {clone} from 'json8'

const tests = [
  {
    "foo": ["bar", "baz"],
    "": 0,
    "a/b": 1,
    "c%d": 2,
    "e^f": 3,
    "g|h": 4,
    "i\\j": 5,
    "k\"l": 6,
    " ": 7,
    "m~n": 8,
  },
  'foo',
  true,
  null,
  ['foo', 'bar'],
  new Set(['foo', 'bar']),
]

const map = new Map()
map.set('object', {foo: 'bar'})
map.set('array', ['foo', 'bar'])
tests.push(map)

describe('unflatten', () => {
  it('returns an equal value of the original', () => {
    tests.forEach(test => {
      const json = clone(test)
      assert.deepEqual(unflatten(flatten(json)), test)
    })
  })
})
