import { NODES } from './constants'

// Transform an array of `nodes` to a map of `nodes`
export const getNodesMap = function(nodes) {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = function(node) {
  const nodeKey = getNodeKey(node)
  return { [nodeKey]: node }
}

export const getNodeKey = function({ category, permission }) {
  return `${category} ${permission}`
}

// Precalculate map for all possible nodes
export const NODES_MAP = getNodesMap(NODES)
