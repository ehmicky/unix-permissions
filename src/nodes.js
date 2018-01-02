'use strict'

const { NODES, CAT_NODES } = require('./constants')
const { mapValues } = require('./utils')

// Transform an array of `nodes` to a map of `nodes`
const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  const nodeKey = getNodeKey(node)
  return { [nodeKey]: node }
}

// The map key does not include `category` when the `nodes` are `catNodes`
// (i.e. category-less nodes)
const getNodeKey = function({ category, permission }) {
  if (category === undefined) {
    return permission
  }

  return `${category} ${permission}`
}

// Precalculate map for all possible nodes
const NODES_MAP = getNodesMap(NODES)
const CAT_NODES_MAP = getNodesMap(CAT_NODES)

// Like `NODES_MAP` but with `add: false` on each node
const getEmptyNodesMap = function() {
  return mapValues(NODES_MAP, unsetAdd)
}

const unsetAdd = function(node) {
  return { ...node, add: false }
}

const EMPTY_NODES_MAP = getEmptyNodesMap()

module.exports = {
  getNodesMap,
  getNodeKey,
  NODES_MAP,
  CAT_NODES_MAP,
  EMPTY_NODES_MAP,
}
