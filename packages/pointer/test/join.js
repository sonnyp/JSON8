import assert from 'assert'
import join from '../lib/join'

describe.only('join', () => {
  it('joins base path and tokens', () => {
    assert.strictEqual(join('/foo', ['bar', 'foo']), '/foo/bar/foo');
    assert.strictEqual(join('/foo', ['bar']), '/foo/bar');
    assert.strictEqual(join(['foo'], ['bar']), '/foo/bar');
    assert.strictEqual(join(['foo'], 'bar'), '/foo/bar');
    assert.strictEqual(join('/foo', 'bar'), '/foo/bar');
    assert.strictEqual(join('/foo', ['bar']), '/foo/bar');
    assert.strictEqual(join('/foo', []), '/foo');
    assert.strictEqual(join('', ['foo']), '/foo');
  })
})
