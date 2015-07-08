'use strict'

// var type = require('./type')
// var forEach = require('./forEach')
var serialize = require('json8-pointer').serialize
var type = require('json8').type
var isPrimitive = require('json8').isPrimitive

// var A = {"same": true, "foo": "bar", "pouet": "lol", "yes": "yes", "foobar": {}}

// var B = {"same": true, "truc": "muche", "yes": "no", "foobar": {"lol": true}}
//
// var A = {"replace": "foo", "deep": {"replace": "foo", "remove": true}, "remove": true}
// var B = {"add": "true", "replace": "bar", "deep": {"replace": "bar"}}

var A = []
var B = ["foo"]

var diff = function(a, b, pre) {
  var patches = []
  var prefix = pre || []

  var at = type(a)
  var bt = type(b)

  if (bt !== at) {
    if (at === undefined)
      patches.push({"op": "add", "path": serialize(prefix), "value": b})
    else
      patches.push({"op": "replace", "path": serialize(prefix), "value": b})
    return patches
  }
  else if (isPrimitive(b)) {
    if (a !== b)
      patches.push({"op": "replace", "path": serialize(prefix), "value": b})
    return patches
  }

  if (bt === 'object') {
    for (var i in b) {
      var pref = prefix.concat([i])
      patches = patches.concat(diff(a[i], b[i], pref))
    }
    for (var i in a) {
      if (b[i] !== undefined)
        continue
      var pref = prefix.concat([i])
      patches.push({"op": "remove", "path": serialize(pref)})
    }
  }
  // else if (bt === 'array') {
  //   for (var i = 0, l < bt.length; i++) {
  //     var item = bt[i]
  //     if (at[0] !== item)

  //   }
  // }



  return patches
}


// var diff = function(a, b, prefix) {
//   var at = type(a)
//   var bt = type(b)
//   var patch = []

//   prefix = prefix || []

//   if (isPrimitive(bt) && bt !== at) {
//     patch.push({"op": "replace", "path": serialize(prefix), "value": b})
//     return patch
//   }

//   if (bt === 'object') {
//     for (var k in b) {

//       var av = a[k]
//       var bv = b[k]
//       if (isPrimitive(bv)) {
//         if (bv === av)
//           continue
//         else {
//           patch.push()
//         }
//       }
//       var path = prefix.concat([k])
//       var op = {"value": bv, "path": serialize(path)}
//       if (av === undefined) op.op = 'add'
//       else op.op = 'replace'
//       patch.push(op)
//       // delete a[k] // TODO this intents to speed up next loop but not sure it's a good idea
//       // maybe an option to disable it and avoid changing input document?
//     } // eslint-disable-line
//     for (var key in a) {
//       if (b[key] === undefined) {
//         var path = prefix.concat([key]) // eslint-disable-line
//         patch.push({"op": "remove", "path": serialize(path)})
//       }
//     }
//   }
//   // else if (bt === 'array') {

//   // }
//   //
//   return patch
// }

  // if (t === 'object') {
  //   for (var i in b) {

  //   }
  // }

  // var patch = []
  // for (var i in a) {
  //   if (b[i] === undefined)
  //     patch.push({"op": "add", "path": "/" + i, "value": a[i]})
  // }
  // return patch
// }
//
// console.log(yeah(true, true))
// console.log(yeah(true, false))
// console.log(yeah([], {}))

console.log(diff(A, B))

module.exports = diff
