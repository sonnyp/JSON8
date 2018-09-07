# JSON8 Merge Patch To Patch

Turn [JSON Merge Patch](https://tools.ietf.org/html/rfc7396) into [JSON Patch](http://tools.ietf.org/html/rfc6902).

JSON Patch is a more capable alternative to JSON Merge Patch.
To work with JSON Patch see [JSON8 Patch](https://github.com/sonnyp/JSON8/tree/master/packages/patch).

---

`npm install json8-merge-patch-to-patch`

---

```javascript
const mergePatchToPatch = require("json8-merge-patch-to-patch");
```

Does not validate the merge patch nor the patch for JSON correctness, use [JSON8 valid](https://github.com/sonnyp/JSON8/tree/master/packages/json8#oovalid).

---

```javascript
const JSONMergePatch = {
  foo: { bar: "foobar" },
  bar: null,
};
const JSONPatch = mergePatchToPatch(JSONMergePatch);
/*
[
  { op: 'add', path: '/foo/bar', value: 'foobar' },
  { op: 'remove', path: '/bar' }
]
*/
```

Per specification a JSON Merge Patch that would successfully apply on a document might fail to apply once converted to a JSON Patch.

There are 3 cases:

Incompatible destination

```javascript
const doc = [];
const JSONMergePatch = { a: "hello" };
const JSONPatch = mergePatchToPatch(JSONMergePatch);
// JSONPatch will fail to apply because doc is not an object
```

Wrong location

```javascript
const doc = {};
const JSONMergePatch = { a: { b: "hello" } };
const JSONPatch = mergePatchToPatch(JSONMergePatch);
// JSONPatch will fail to apply because doc.a doesn't exist
```

Remove non-existant value

```javascript
const doc = {};
const JSONMergePatch = { a: null };
const JSONPatch = mergePatchToPatch(JSONMergePatch);
// JSONPatch will fail to apply because doc.a doesn't exist
```

An option could be added to produce a successful JSON Patch no matter what but the only way to do this is to pass the document as well. Let me know if there is any interest or [contribute](https://github.com/sonnyp/JSON8/blob/master/CONTRIBUTING.md).

[↑](#json8-merge-patch-to-patch)
