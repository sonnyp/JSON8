"use strict";

function getCancellingOperation(operations = [], pattern = RegExp()) {
  const cancellingOperation = operations.find(({ op }) => pattern.test(op));
  if (cancellingOperation !== undefined) {
    return cancellingOperation;
  }

  return null;
}

const Cancelling = {
  remove: {
    compact(operations = [], jsonPatch = []) {
      const cancelling = getCancellingOperation(operations, /add|replace|copy/);
      if (cancelling) {
        jsonPatch.splice(jsonPatch.indexOf(cancelling), 1);
        if (cancelling.op !== "replace") {
          jsonPatch.pop();
        }
      }
    },
  },
  add: {
    compact(operations = [], jsonPatch) {
      const cancelling = getCancellingOperation(operations, /remove/);
      if (cancelling) {
        jsonPatch.splice(jsonPatch.indexOf(cancelling), 1);
        jsonPatch.pop();
      }
    },
  },
  replace: {
    compact(operations = [], jsonPatch, { value }) {
      const cancelling = getCancellingOperation(operations, /replace|copy/);
      if (cancelling && cancelling.value !== value) {
        jsonPatch.splice(jsonPatch.indexOf(cancelling), 1);
      }
    },
  },
  copy: {
    compact(operations = [], jsonPatch, { value }) {
      const cancelling = getCancellingOperation(operations, /replace/);
      if (cancelling && cancelling.value !== value) {
        jsonPatch.splice(jsonPatch.indexOf(cancelling), 1);
      }
    },
  },
  move: { compact() {} },
  test: { compact() {} },
};

function compact(jsonPatch = []) {
  const operations = {};
  const auxPatch = [];

  jsonPatch.forEach(operation => {
    const { op, path, value } = operation;
    if (operations[path] === undefined) {
      operations[path] = [];
    }

    operations[path].push(operation);
    auxPatch.push(operation);
    Cancelling[op].compact(operations[path], auxPatch, { value });
  });

  return auxPatch;
}

module.exports = compact;
