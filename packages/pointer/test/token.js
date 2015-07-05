'use strict'

import assert from 'assert'
import {parse, serialize} from '..'

describe('parse', () => {

  it('returns [\'foo\', \'bar\']', () => {
    const r = parse('/foo/bar')
    assert.deepEqual(r, ['foo', 'bar'])
  })

  it('returns [""]', () => {
    const r = parse('/')
    assert.deepEqual(r, [''])
  })

  it('returns []', () => {
    const r = parse('')
    assert.deepEqual(r, [])
  })

})

describe('serialize', () => {

  it('should return /foo/bar', () => {
    const s = serialize(['foo', 'bar'])
    assert.deepEqual(s, '/foo/bar')
  })

  it('should return ""', () => {
    const s = serialize([])
    assert.deepEqual(s, '')
  })

  it('should return /', () => {
    const s = serialize([''])
    assert.deepEqual(s, '/')
  })

})
