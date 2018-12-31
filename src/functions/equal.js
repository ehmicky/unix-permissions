'use strict'

const { binaryTest } = require('../helpers')

// Test whether two permissions are exactly the same, including omitted nodes.
// As opposed to using `===`, this works across permissions. It also works
// with non-canonical variations, e.g. `equal('a+x,a+x', 'a+x')` is `true`
const equalTest = function(nodesMapA, nodesMapB) {
  return sameLength(nodesMapA, nodesMapB) && sameNodes(nodesMapA, nodesMapB)
}

const sameLength = function(nodesMapA, nodesMapB) {
  return Object.keys(nodesMapA).length === Object.keys(nodesMapB).length
}

const sameNodes = function(nodesMapA, nodesMapB) {
  return Object.entries(nodesMapA).every(([nodeKey, node]) =>
    isSameNode(node, nodesMapB[nodeKey]),
  )
}

const isSameNode = function(nodeA = {}, nodeB = {}) {
  return ATTRIBUTES.every(attribute => nodeA[attribute] === nodeB[attribute])
}

const ATTRIBUTES = ['category', 'permission', 'add']

const equal = binaryTest.bind(null, equalTest)

module.exports = {
  equal,
}
