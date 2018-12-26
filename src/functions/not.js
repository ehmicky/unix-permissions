'use strict'

const { mapValues } = require('../utils')

// We do not export not() because:
//  - on types that do not support `add:false` like `stat` or `number`, it
//    would always result in 0, which is confusing.
//  - `unset()`, `invert()` and `flip()` should cover most use cases
const notMap = function(nodesMap) {
  return mapValues(nodesMap, invertAdd)
}

const invertAdd = function({ add, ...node }) {
  return { ...node, add: !add }
}

module.exports = {
  notMap,
}
