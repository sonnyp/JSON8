import assert from 'assert'
import {index} from '..'

const primitives = {
  'null': null,
  'string': 'hello',
  'boolean': true,
  'number': -42,
}

const structures = {
  'array': [],
  'object': {},
  'map': new Map(),
  'set': new Set(),
}

function forEach(obj, fn) {
  for (const i in obj) {
    fn(i, obj[i])
  }
}

describe('index', () => {
  describe('primitives', () => {
    forEach(primitives, (name, value) => {
      it('indexes ' + name + ' primitive correctly', () => {
        const expect = {'': value}
        assert.deepEqual(index(value), expect)
      })
    })
  })

  describe('empty structures', () => {
    forEach(structures, (name, value) => {
      it('indexes empty ' + name + ' structure correctly', () => {
        const expect = {'': value}
        assert.deepEqual(index(value), expect)
      })
    })
  })
})
