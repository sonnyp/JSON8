import assert from 'assert'
import {serialize} from '..'

const valid = [
  ['true', true],
  ['false', false],
  ['null', null],
  ['"foo"', 'foo'],
  ['{}', {}],
  ['[]', []],
  ['42', 42],
  ['-0', -0],
  ['-42', -42],
  ['[]', new Set()],
  ['{}', new Map()],
]

const invalid = [
  ['Infinity', Infinity],
  ['-Infinity', -Infinity],
  ['function', function() {}],
  ['undefined', undefined],
  ['NaN', NaN],
]

if (global.Symbol && typeof Symbol() === 'symbol') invalid.push(['symbol', Symbol()])

const compare = {
  "string": "hello",
  "null": null,
  "true": true,
  "false": false,
  "empty string": "",
  "empty object": {},
  "empty map": new Map(),
  "empty array": [],
  "empty set": new Set(),
}

const forEach = function(obj, fn) {
  obj.forEach(function(item) {
    fn(item[0], item[1])
  })
}

describe('serialize', () => {
  describe('compare', () => {
    for (const key in compare) {
      const v = compare[key]
      it(key, () => { // eslint-disable-line
        if (!(v instanceof Map) && !(v instanceof Set)) {
          assert.strictEqual(serialize(v), JSON.stringify(v))
          assert.strictEqual(serialize(v, {space: 2}), JSON.stringify(v, null, 2))
          assert.strictEqual(serialize(v, {space: '    '}), JSON.stringify(v, null, '    '))
        }
      })
    }
  })


  forEach(valid, (k, v) => {
    it('returns ' + k + ' for ' + k, () => {
      assert.deepEqual(serialize(v), k)
    })
  })

  forEach(invalid, (k, v) => {
    it('throws a TypeError for ' + k, () => {
      assert.throws(() => {
        serialize(v)
      }, TypeError)
    })
  })

  describe('map', () => {
    it('throws an error for non string keys', () => {
      const map = new Map()
      map.set(null, 'hello')
      assert.throws(() => {
        serialize(map)
      }, TypeError)
    })
  })

  describe('toJSON option', () => {

    it('uses toJSON if options are not provided', () => {
      const obj = {}
      obj.toJSON = function() {
        return 'lol'
      }
      assert.strictEqual(serialize(obj), '"lol"')
    })

    it('uses toJSON toJSON option is not provided', () => {
      const obj = {}
      obj.toJSON = function() {
        return 'lol'
      }
      assert.strictEqual(serialize(obj, {}), '"lol"')
    })

    it('uses toJSON toJSON option is set to true', () => {
      const obj = {}
      obj.toJSON = function() {
        return 'lol'
      }
      assert.strictEqual(serialize(obj, {toJSON: true}), '"lol"')
    })

    it('does not use and serialize toJSON if toJSON option is set to false', () => {
      const obj = {}
      obj.toJSON = function() {
        return 'lol'
      }
      assert.strictEqual(serialize(obj, {toJSON: false}), '{}')
    })

    it('serializes toJSON if it is not a function', () => {
      const obj = {toJSON: true}
      const expect = '{"toJSON":true}'
      assert.strictEqual(serialize(obj), expect)
      assert.strictEqual(serialize(obj, {}), expect)
      assert.strictEqual(serialize(obj, {toJSON: false}), expect)
      assert.strictEqual(serialize(obj, {toJSON: true}), expect)
    })

  })

  describe('space option', () => {
    const arr = [1, 'foo', [], {}]
    arr.toJSON = 'hello'

    const obj = {
      array: arr,
      boolean: true,
      toJSON: 123,
      string: 'foobar',
      "Déjà vu": "Déjà vu",
      /* eslint-disable */
      bar: {
        toJSON: function() {
          return {"foo": "bar"}
        },
      },
      /* eslint-enable */
    }

    it('serializes equally to it', () => {
      assert.strictEqual(serialize(obj), JSON.stringify(obj))
    })

    it('serializes equally to it with space param as number', () => {
      assert.strictEqual(serialize(obj, {space: 2}), JSON.stringify(obj, null, 2))
      assert.strictEqual(serialize(obj, {space: 2}), JSON.stringify(obj, null, '  '))
    })

    it('serializes equally to it with space param as string', () => {
      assert.strictEqual(serialize(obj, {space: '    '}), JSON.stringify(obj, null, '    '))
      assert.strictEqual(serialize(obj, {space: '    '}), JSON.stringify(obj, null, 4))
    })
  })

  describe('replacer option', () => {

    it('is called with the object as this context', () => {
      const obj = {
        foo: 'bar',
      }
      const replacer = function(k, v) {
        assert.strictEqual(this, obj) // eslint-disable-line no-invalid-this
        assert.strictEqual(k, 'foo')
        assert.strictEqual(v, 'bar')
      }
      serialize(obj, {replacer})
    })

    it('deletes the value if the replacer return undefined for object', () => {
      const obj = {
        foo: 'bar',
      }
      const replacer = function() {
        return undefined
      }
      assert.strictEqual(serialize(obj, {replacer}), '{}')
    })

    it('deletes the value if the replacer return undefined for array', () => {
      const arr = ['foo']
      const replacer = function(k, v) {
        assert.strictEqual(this, arr) // eslint-disable-line no-invalid-this
        assert.strictEqual(k, 0)
        assert.strictEqual(v, 'foo')
        return undefined
      }
      assert.strictEqual(serialize(arr, {replacer}), '[]')
    })

    it('splice the object if an item is deleted in between for object', () => {
      const obj = {'foo': 'bar', 'bar': undefined, baz: 'baz'}
      const replacer = function(k, v) {
        if (k === 'bar')
          return undefined
        return v
      }
      assert.strictEqual(serialize(obj, {replacer}), '{"foo":"bar","baz":"baz"}')
    })

    it('splice the map if an item is deleted in between for map', () => {
      const map = new Map()
      map.set('foo', 'bar')
      map.set('bar', undefined)
      map.set('baz', 'baz')
      const replacer = function(k, v) {
        if (k === 'bar')
          return undefined
        return v
      }
      assert.strictEqual(serialize(map, {replacer}), '{"foo":"bar","baz":"baz"}')
    })

    it('splice the array if an item is deleted in between for array', () => {
      const arr = ['foo', 'bar', 'foo']
      const replacer = function(k, v) {
        if (k === 1)
          return undefined
        return v
      }
      assert.strictEqual(serialize(arr, {replacer}), '["foo","foo"]')
    })

    it('splice the array if an item is deleted in between for set', () => {
      const set = new Set(['foo', 'bar', 'baz'])
      const replacer = function(k, v) {
        if (k === 'bar')
          return undefined
        return v
      }
      assert.strictEqual(serialize(set, {replacer}), '["foo","baz"]')
    })

    describe('with space option', () => {
      it('object', () => {
        const replacer = () => undefined
        const s = serialize({foo: 'bar'}, {replacer, space: 2})
        assert.strictEqual(s, '{}')
      })

      it('array', () => {
        const replacer = () => undefined
        const s = serialize(['foo'], {replacer, space: 2})
        assert.strictEqual(s, '[]')
      })

      it('set', () => {
        const replacer = () => undefined
        const s = serialize(new Set(['foo']), {replacer, space: 2})
        assert.strictEqual(s, '[]')
      })

      it('map', () => {
        const replacer = () => undefined
        const map = new Map()
        map.set('foo', 'bar')
        const s = serialize(map, {replacer, space: 2})
        assert.strictEqual(s, '{}')
      })
    })

    // https://github.com/JSON8/JSON8/issues/18
    describe('returns undefined', () => {
      const replacer = (k, v) => v

      it('produces correct JSON for object', () => {
        const s = serialize({foo: 'bar', baz: undefined}, {replacer})
        assert.strictEqual(s, '{"foo":"bar"}')
      })

      it('produces correct JSON for array', () => {
        const s = serialize(['foo', undefined], {replacer})
        assert.strictEqual(s, '["foo"]')
      })

      it('produces correct JSON for Set', () => {
        const set = new Set(['foo', undefined])
        const s = serialize(set, {replacer})
        assert.strictEqual(s, '["foo"]')
      })

      it('produces correct JSON for Map', () => {
        const map = new Map()
        map.set('foo', 'bar')
        map.set('baz', undefined)
        const s = serialize(map, {replacer})
        assert.strictEqual(s, '{"foo":"bar"}')
      })
    })

    describe('maxIndentLevel', () => {
      const obj = [{"foo": {"bar": "foo"}}]

      assert.strictEqual(
        serialize(obj, {space: 0, maxIndentLevel: 0}),
        '[{"foo":{"bar":"foo"}}]'
      )

      assert.strictEqual(
        serialize(obj, {space: 0, maxIndentLevel: 1}),
        '[{"foo":{"bar":"foo"}}]'
      )

      assert.strictEqual(
        serialize(obj, {maxIndentLevel: 0}),
        '[{"foo":{"bar":"foo"}}]'
      )

      assert.strictEqual(
        serialize(obj, {maxIndentLevel: 1}),
        '[{"foo":{"bar":"foo"}}]'
      )

      assert.strictEqual(
        serialize(obj, {space: 2, maxIndentLevel: 0}),
        '[{"foo": {"bar": "foo"}}]'
      )

      assert.strictEqual(
        serialize(obj, {space: 2, maxIndentLevel: 1}),
        '[\n  {"foo": {"bar": "foo"}}\n]'
      )

      assert.strictEqual(
        serialize(obj, {space: 2, maxIndentLevel: 2}),
        '[\n  {\n    "foo": {"bar": "foo"}\n  }\n]'
      )
    })
  })
})
