'use strict'

const { NODES, CAT_NODES } = require('./constants')
const { keyBy } = require('./utils')

const getNode = function({ category, permission }) {
  const nodeKey = getNodeKey({ category, permission })
  return NODES_MAP[nodeKey]
}

const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  const key = getNodeKey(node)
  return { [key]: node }
}

const getNodeKey = function({ category, permission }) {
  return `${category} ${permission}`
}

const NODES_MAP = getNodesMap(NODES)

const getCatNodesMap = function(nodes) {
  return keyBy(nodes, 'permission')
}

const getCatNodeKey = function({ permission }) {
  return permission
}

const CAT_NODES_MAP = getCatNodesMap(CAT_NODES)

module.exports = {
  getNode,
  getNodesMap,
  getNodeKey,
  NODES_MAP,
  getCatNodeKey,
  CAT_NODES_MAP,
}
