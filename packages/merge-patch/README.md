JSON8-merge-patch
===========

[![build status](https://img.shields.io/travis/JSON8/merge-patch.svg?style=flat-square)](https://travis-ci.org/JSON8/merge-patch)

Implementation of [RFC 7396](https://tools.ietf.org/html/rfc7396)

```
npm install json8-merge-patch
```

```javascript
var JSON8 = require('json8-merge-patch');
```

# apply

```javascript
doc = JSON8.apply(doc, {"name": "Jeanette doe"});
```

# patch

```JSON8.patch``` is an alias of ```JSON8.apply``` and behave exactly the same.

# toJSONPatch

This method is only available if [JSON8-pointer](https://github.com/JSON8/pointer) is installed.

```npm install json8-pointer```

```javascript
var JSONMergePatch = {
  "foo": {"bar": "foobar"},
  "foo": null}
}
var JSONPatch = JSON8.toJSONPatch(JSONMergePatch)
//[
//  { op: 'add', path: '/foo/bar', value: 'foobar' },
//  { op: 'delete', path: '/foo/foo' }
//]
```

# tests

```
npm install -g eslint mocha
npm test
```
