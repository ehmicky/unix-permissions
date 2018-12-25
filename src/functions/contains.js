'use strict'

const { binaryTest } = require('../helpers')

const containsTest = function(nodesMap, nodesMapA) {
  return Object.entries(nodesMapA).every(([nodeKey, node]) =>
    containsNode({ nodesMap, nodeKey, node }),
  )
}

const containsNode = function({ nodesMap, nodeKey, node }) {
  const { add } = nodesMap[nodeKey] || {}
  return addMatch(node.add, add)
}

const addMatch = function(add, addB) {
  return (add === true && addB === true) || (add === false && addB !== true)
}

const contains = binaryTest.bind(null, containsTest)

module.exports = {
  contains,
}
