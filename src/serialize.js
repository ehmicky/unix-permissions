'use strict'

const { getNode } = require('./nodes')

const serialize = function(type, nodesMap) {
  const nodes = normalizeNodes({ nodesMap })
  const perm = type.serialize(nodes)
  return perm
}

const serializeCategory = function(type, nodesMap, category) {
  const nodes = normalizeNodes({ nodesMap })
  const catNodes = nodes
    .filter(node => node.category === category)
    .map(removeCategory)
  const catPerm = type.serializeCategory(catNodes)
  return catPerm
}

const removeCategory = function({ permission, add }) {
  return { permission, add }
}

const normalizeNodes = function({ nodesMap }) {
  // eslint-disable-next-line fp/no-mutating-methods
  return Object.values(nodesMap).sort(compareNodes)
}

// Ensure nodes have a stable order before serializing
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
  serializeCategory,
}
