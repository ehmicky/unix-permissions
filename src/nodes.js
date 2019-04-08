import { NODES } from './constants.js'

// Transform an array of `nodes` to a map of `nodes`
const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  const nodeKey = getNodeKey(node)
  return { [nodeKey]: node }
}

const getNodeKey = function({ category, permission }) {
  return `${category} ${permission}`
}

// Precalculate map for all possible nodes
const NODES_MAP = getNodesMap(NODES)

module.exports = {
  getNodesMap,
  getNodeKey,
  NODES_MAP,
}
