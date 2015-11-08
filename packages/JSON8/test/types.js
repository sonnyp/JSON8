import assert from 'assert'
import types from '..'

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

  describe('STRUCTURES', () => {
    it('contains ARRAY', () => {
      assert(types.STRUCTURES.indexOf(types.ARRAY) !== -1)
    })
    it('contains OBJECT', () => {
      assert(types.STRUCTURES.indexOf(types.OBJECT) !== -1)
    })
    it('has a length of 2', () => {
      assert.equal(types.STRUCTURES.length, 2)
    })
  })

  describe('PRIMITIVES', () => {
    it('contains STRING', () => {
      assert(types.PRIMITIVES.indexOf(types.STRING) !== -1)
    })
    it('contains NUMBER', () => {
      assert(types.PRIMITIVES.indexOf(types.NUMBER) !== -1)
    })
    it('contains NULL', () => {
      assert(types.PRIMITIVES.indexOf(types.NULL) !== -1)
    })
    it('contains BOOLEAN', () => {
      assert(types.PRIMITIVES.indexOf(types.BOOLEAN) !== -1)
    })
    it('has a length of 4', () => {
      assert.equal(types.PRIMITIVES.length, 4)
    })
  })

})
