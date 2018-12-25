'use strict'

const { binaryTest } = require('../helpers')
const { getNodesMap, getNodeKey } = require('../nodes')

const containsTest = function(nodes, nodesA) {
  const nodesMap = getNodesMap(nodes)
  return nodesA.every(node => containsNode({ nodesMap, node }))
}

const containsNode = function({ nodesMap, node }) {
  const nodeKey = getNodeKey(node)
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
