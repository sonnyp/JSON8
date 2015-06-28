JSON8-pointer
===========

[![build status](https://img.shields.io/travis/JSON8/pointer.svg?style=flat-square)](https://travis-ci.org/JSON8/pointer)

[JSON Pointer](http://tools.ietf.org/html/rfc6901) implementation for JavaScript

```
npm install json8-pointer
```

```javascript
var JSON8 = require('jsong-pointer');
```

# parse

```javascript
JSON8.parse('/foo/bar/hello');
// returns ['foo', 'bar', 'hello'];
```

# serialize

 ```javascript
JSON8.serialize(['foo', 'bar', 'hello']);
// returns ('/foo/bar/hello');
```

# tests

```
npm install -g eslint mocha
npm test
```
