"use strict";

function getCancellingOperation(operations = [], pattern = RegExp()) {
  const cancellingOperation = operations.find(op => pattern.test(op[1]));
  if (cancellingOperation !== undefined) {
    return cancellingOperation;
  }

  return null;
}

const Cancelling = {
  remove: {
    compact(operations = [], jsonPatch) {
      const cancelling = getCancellingOperation(operations, /add|replace|copy/);
      if (cancelling) {
        jsonPatch.splice(cancelling[0], 1);
        if (cancelling[1] !== "replace") {
          jsonPatch.pop();
        }
      }
    },
  },
  add: {
    compact(operations = [], jsonPatch) {
      const cancelling = getCancellingOperation(operations, /remove/);
      if (cancelling) {
        jsonPatch.splice(cancelling[0], 1);
        jsonPatch.pop();
      }
    },
  },
  replace: {
    compact(operations = [], jsonPatch, value) {
      const cancelling = getCancellingOperation(operations, /replace|copy/);
      if (cancelling && cancelling[2] !== value) {
        jsonPatch.splice(cancelling[0], 1);
      }
    },
  },
  copy: {
    compact(operations = [], jsonPatch, value) {
      const cancelling = getCancellingOperation(operations, /replace/);
      if (cancelling && cancelling[2] !== value) {
        jsonPatch.splice(cancelling[0], 1);
      }
    },
  },
  move: {
    compact() {},
  },
  test: {
    compact() {},
  },
};

function compact(jsonPatch = []) {
  const operations = {};

  for (const i in jsonPatch) {
    const { op, path, value } = jsonPatch[i];
    if (operations[path] === undefined) {
      operations[path] = [];
    }

    operations[path].push([i, op, value]);

    Cancelling[op].compact(operations[path], jsonPatch, value);
  }

  return jsonPatch;
}

module.exports = compact;
