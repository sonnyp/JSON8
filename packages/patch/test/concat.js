'use strict'

const assert = require('assert')
const concat = require('../lib/concat')

describe('concat', () => {
  it('concats the patches into a bigger patch', () => {
    const patch0 = [{}]
    const patch1 = [{}]
    const patch2 = [{}]
    const patch = concat(patch0, patch1, patch2)
    assert.deepEqual(patch, [{}, {}, {}])
  })
})
