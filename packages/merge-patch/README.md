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

# tests

```
npm install -g eslint mocha
npm test
```
