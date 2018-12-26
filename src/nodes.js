'use strict'

const { NODES, CAT_NODES } = require('./constants')
const { keyBy } = require('./utils')

const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  const key = getNodeKey(node)
  return { [key]: node }
}

const getNodeKey = function({ category, permission }) {
  if (category === undefined) {
    return permission
  }

  return `${category} ${permission}`
}

const NODES_MAP = getNodesMap(NODES)

const getCatNodesMap = function(nodes) {
  return keyBy(nodes, 'permission')
}

const CAT_NODES_MAP = getCatNodesMap(CAT_NODES)

module.exports = {
  getNodesMap,
  getNodeKey,
  NODES_MAP,
  CAT_NODES_MAP,
}
