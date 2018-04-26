"use strict";

const ops = Object.create(null);
ops.add = 0;
ops.remove = 1;
ops.replace = 2;
ops.move = 3;
ops.copy = 4;
ops.test = 5;

module.exports = function pack(patch) {
  const packed = [];

  for (let i = 0, l = patch.length; i < l; i++) {
    const p = patch[i];
    const a = ops[p.op];
    const op = [a, p.path];
    // add, replace, test
    if (a === 0 || a === 2 || a === 5) op.push(p.value);
    // move copy
    else if (a !== 1) {
      op.push(p.from);
    }

    packed.push(op);
  }

  return packed;
};
