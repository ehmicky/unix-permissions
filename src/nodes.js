'use strict'

// `NODES` must be sorted by `order` because some types' serialization relies on
// nodes being sorted accordingly.
const { NODES } = require('./constants')
const { keyBy } = require('./utils')

const getNode = function(node) {
  const nodeKey = getNodeKey(node)
  return NODES_MAP[nodeKey]
}

const getNodesMap = function() {
  const nodes = NODES.map(addKey)
  return keyBy(nodes, 'key')
}

const addKey = function(node) {
  const key = getNodeKey(node)
  return { ...node, key }
}

const getNodeKey = function({ category, permission }) {
  return `${category} ${permission}`
}

const NODES_MAP = getNodesMap()

module.exports = {
  getNode,
  getNodeKey,
}
