'use strict'

const { NODES, CAT_NODES } = require('./constants')
const { keyBy } = require('./utils')

const getNode = function({ category, permission }) {
  const nodeKey = getNodeKey({ category, permission })
  return NODES_MAP[nodeKey]
}

const getNodesMap = function(nodes) {
  const nodesA = nodes.map(addKey)
  return keyBy(nodesA, 'key')
}

const addKey = function(node) {
  const key = getNodeKey(node)
  return { ...node, key }
}

const getNodeKey = function({ category, permission }) {
  return `${category} ${permission}`
}

const NODES_MAP = getNodesMap(NODES)

const getCatNode = function({ permission }) {
  return CAT_NODES_MAP[permission]
}

const getCatNodesMap = function(nodes) {
  return keyBy(nodes, 'permission')
}

const CAT_NODES_MAP = getCatNodesMap(CAT_NODES)

module.exports = {
  getNode,
  getNodesMap,
  NODES_MAP,
  getCatNode,
}
