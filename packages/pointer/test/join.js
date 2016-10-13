import assert from 'assert'
import join from '../lib/join'

describe('join', () => {
  it('joins base path and tokens', () => {
    assert.strictEqual(join('/foo', ['bar', 'foo']), '/foo/bar/foo');
    assert.strictEqual(join('/foo', ['bar']), '/foo/bar');
    assert.strictEqual(join(['foo'], ['bar']), '/foo/bar');
    assert.strictEqual(join(['foo'], 'bar'), '/foo/bar');
    assert.strictEqual(join('/foo', 'bar'), '/foo/bar');
    assert.strictEqual(join('/foo', ['bar']), '/foo/bar');
    assert.strictEqual(join('/foo', []), '/foo');
    assert.strictEqual(join('', ['foo']), '/foo');

    assert.strictEqual(join('', ['0']), '/0');
    assert.strictEqual(join('/0', ['foo']), '/0/foo');

    assert.strictEqual(join([], []), '');
    assert.strictEqual(join('', []), '');
    assert.strictEqual(join('', ''), '/');
    assert.strictEqual(join([], ''), '/');
  })
})
