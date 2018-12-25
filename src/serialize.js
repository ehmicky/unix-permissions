'use strict'

const { getNode } = require('./nodes')

const serialize = function(type, nodesMap) {
  const nodes = Object.values(nodesMap)
  const nodesA = sortNodes(nodes)
  const perm = type.serialize(nodesA)
  return perm
}

// Ensure nodes have a stable order before serializing
const sortNodes = function(nodes) {
  // eslint-disable-next-line fp/no-mutating-methods
  return nodes.sort(compareNodes)
}

const compareNodes = function(nodeA, nodeB) {
  const { order: orderA } = getNode(nodeA)
  const { order: orderB } = getNode(nodeB)

  if (orderA > orderB) {
    return 1
  }

  if (orderA < orderB) {
    return -1
  }

  return 0
}

module.exports = {
  serialize,
}
