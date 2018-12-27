'use strict'

const { NODES, CAT_NODES } = require('./constants')

const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  const nodeKey = getNodeKey(node)
  return { [nodeKey]: node }
}

const getNodeKey = function({ category, permission }) {
  if (category === undefined) {
    return permission
  }

  return `${category} ${permission}`
}

const NODES_MAP = getNodesMap(NODES)
const CAT_NODES_MAP = getNodesMap(CAT_NODES)

module.exports = {
  getNodesMap,
  getNodeKey,
  NODES_MAP,
  CAT_NODES_MAP,
}
