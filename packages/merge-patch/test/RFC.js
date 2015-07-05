'use strict'

import assert from 'assert'
import apply from '../lib/apply'
import tests from './RFC.json'
import {clone} from 'json8'

describe('RFC', () => {

  tests.forEach(function(test) {
    test = clone(test)
    it('returns ' + JSON.stringify(test.result), () => {
      assert.deepEqual(apply(test.original, test.patch), test.result)
    })
  })

})
