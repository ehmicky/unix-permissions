import { NODES } from './constants.js'

// Transform an array of `nodes` to a map of `nodes`
export const getNodesMap = (nodes) => {
  const pairs = nodes.map(getNodePair)
  return Object.assign({}, ...pairs)
}

const getNodePair = (node) => {
  const nodeKey = getNodeKey(node)
  return { [nodeKey]: node }
}

export const getNodeKey = ({ category, permission }) =>
  `${category} ${permission}`

// Precalculate map for all possible nodes
export const NODES_MAP = getNodesMap(NODES)
