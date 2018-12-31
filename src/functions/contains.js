'use strict'

const { binaryTest } = require('../helpers')

// Test whether all permissions in `nodesMapB` are included in `nodesMapA`
// Missing permissions in `nodesMapB` are not checked.
// `+` permissions in `nodesMapB` must be `+` in `nodesMapA`
// `-` permissions in `nodesMapB` must be `-` in `nodesMapA`
const containsTest = function(nodesMapA, nodesMapB) {
  return Object.entries(nodesMapB).every(([nodeKey, node]) =>
    containsNode(node, nodesMapA[nodeKey]),
  )
}

const containsNode = function(nodeA = {}, nodeB = {}) {
  return nodeA.add === nodeB.add
}

const contains = binaryTest.bind(null, containsTest)

module.exports = {
  contains,
  containsTest,
}
