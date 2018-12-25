'use strict'

const { NODES } = require('./constants')
const { keyBy, mapValues } = require('./utils')

const getNode = function(node) {
  const nodeKey = getNodeKey(node)
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

const getEmptyNodesMap = function() {
  return mapValues(NODES_MAP, getEmptyNode)
}

const getEmptyNode = function({ category, permission }) {
  return { category, permission, add: false }
}

const EMPTY_NODES_MAP = getEmptyNodesMap()

module.exports = {
  getNode,
  getNodeKey,
  getNodesMap,
  NODES_MAP,
  EMPTY_NODES_MAP,
}
