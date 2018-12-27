'use strict'

const { NODES, CAT_NODES } = require('./constants')
const { keyBy } = require('./utils')

const getNodeKey = function({ category, permission }) {
  if (category === undefined) {
    return permission
  }

  return `${category} ${permission}`
}

const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  return { [getNodeKey(node)]: node }
}

const NODES_MAP = getNodesMap(NODES)

const getCatNodesMap = function(nodes) {
  return keyBy(nodes, 'permission')
}

const CAT_NODES_MAP = getCatNodesMap(CAT_NODES)

module.exports = {
  getNodeKey,
  getNodesMap,
  NODES_MAP,
  CAT_NODES_MAP,
}
