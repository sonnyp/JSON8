"use strict";

function getCancellingOperation(operations = [], pattern = RegExp()) {
  const cancellingOperation = operations.find(({ op }) => pattern.test(op));
  if (cancellingOperation !== undefined) {
    return cancellingOperation;
  }

  return null;
}

function removeCancellingOperation(jsonPatch = [], cancelling = {}) {
  jsonPatch.splice(jsonPatch.indexOf(cancelling), 1);
}

const Cancelling = {
  remove: {
    compact(operations = [], jsonPatch = []) {
      const cancelling = getCancellingOperation(operations, /add|replace|copy/);
      if (cancelling) {
        removeCancellingOperation(jsonPatch, cancelling);
        if (cancelling.op !== "replace") {
          jsonPatch.pop();
        }
      }
    },
  },
  replace: {
    compact(operations = [], jsonPatch, { value }) {
      const cancelling = getCancellingOperation(operations, /replace|copy/);
      if (cancelling && cancelling.value !== value) {
        removeCancellingOperation(jsonPatch, cancelling);
      }
    },
  },
  copy: {
    compact(operations = [], jsonPatch, { value }) {
      const cancelling = getCancellingOperation(operations, /replace/);
      if (cancelling && cancelling.value !== value) {
        removeCancellingOperation(jsonPatch, cancelling);
      }
    },
  },
  add: { compact() {} },
  move: { compact() {} },
  test: { compact() {} },
};

function compact(jsonPatch = []) {
  const operations = {};
  const resultJsonPatch = [];

  jsonPatch.forEach(operation => {
    const { op, path } = operation;

    if (operations[path] === undefined) {
      operations[path] = [];
    }

    operations[path].push(operation);
    resultJsonPatch.push(operation);

    Cancelling[op].compact(operations[path], resultJsonPatch, operation);
  });

  return resultJsonPatch;
}

module.exports = compact;
