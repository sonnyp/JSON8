JSON8-patch
===========

[![build status](https://img.shields.io/travis/JSON8/patch.svg?style=flat-square)](https://travis-ci.org/JSON8/patch)

JSON8-patch passes the entire [json-patch-tests](https://github.com/json-patch/json-patch-tests) suite; see [Tests](#tests)

http://jsonpatch.com/


```
npm install json8-patch
```

```javascript
var JSON8 = require('json8-patch');
```

For performance concerns JSON8-patch mutates documents; if you want it to work on its own shallow copy of your document use:

```javascript

doc = JSON8.clone(doc)
```
See [clone](https://github.com/JSON8/core#clone).

```javascript
var doc = {
  "name": "John Doe",
  "address": {
    "street": "...",
    "number": 42,
    "city": "Neverland"
  },
  "tags": ["friends", "coworker"],
  "age": 25,
  "starred": true,
  "height": null
});
```

# patch

```javascript
doc = JSON8.patch(doc, [
  { "op": "add",     "path": "/tags/0",        "value": "family"          },
  { "op": "remove",  "path": "/height"                                    },
  { "op": "replace", "path": "/age",           "value": "26"              },
  { "op": "move",    "from": "/address/city",  "path": "/address/country" },
  { "op": "copy",    "from": "/starred",       "to":    "bookmarked"      },
  { "op": "test",    "path": "/starred",       "value": true              }
]);
```

```JSON8.patch``` returns a document because the JSON Patch specification states that an operation can replace the original document.

```JSON8.patch``` is atomic, if any operation fails, the document will be restored to its original state and an error will be thrown.

# Apply

```JSON8.apply``` is an alias to ```JSON.patch``` and behaves exactly the same.

# Revert

If ```JSON8.patch``` is passed with a third argument ```{revert: true}``` it will return an array ```[doc, items]```.

The items object can be used to revert a patch on a document.

```javascript
// apply the patch
var patchResult = JSON8.patch(doc, patch, {revert: true});
doc = patchResult[0];

// revert the patch
doc = JSON8.revert(doc, patchResult[1]);
// doc is strictly identical (in the JSON sense) to the original
```

# Operations

```add```, ```copy```, ```replace```, ```move```, ```remove```, ```test``` operations return an array of the form ```[document, previous, idx]```

The first argument is returned for the same reason ```JSON8.apply``` returns a document see [Patch](#patch)

The second argument is the previous value at the specified destination if any, undefined otherwise.

The third argument is the index of the new element. For ```add``` operation only using the JSON Pointer '-' token to push an item at the end of an array.

## add
```javascript
doc = JSON8.add(doc, '/foo', 'foo')[0]
```

## remove
```javascript
doc = JSON8.remove(doc, '/foo')[0];
```

## replace
```javascript
doc = JSON8.replace(doc, '/foo', 'foo')[0];
```

## move
```javascript
doc = JSON8.move(doc, '/foo', '/bar')[0];
```

## copy
```javascript
doc = JSON8.copy(doc, '/foo', '/bar')[0];
```

## test
```javascript
doc = JSON8.test(doc, '/foo', 'bar')[0];
```

# Extra operations

Those are not part of the standard and are only provided for convenience. They cannot be used inside a JSON Patch document.

## get
```javascript
JSON8.get(doc, '/foo');
// returns value at /foo
```

## has
```javascript
JSON8.has(doc, '/foo');
// returns true if foo property exists, false otherwise
```

# tests

```
git submodule update --init --recursive
npm install -g eslint mocha
npm test
```
