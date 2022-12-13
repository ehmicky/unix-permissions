import { SPECIAL_PERMISSIONS } from '../../constants.js'
import { NODES_MAP, getNodesMap } from '../../nodes.js'

import { contractSpecial } from './tokenize.js'

// Serialize from `nodes` to a `stat` permission
export const serialize = (nodes) => {
  const addedNodes = getAddedNodes({ nodes })

  const stat = Object.entries(NODES_MAP)
    .map(([nodeKey, node]) => serializeNode({ node, nodeKey, addedNodes }))
    .join('')
  // Special permissions are contracted into `x`
  const statA = contractSpecial(stat)
  return statA
}

// Get a `nodesMap` of the added permissions
const getAddedNodes = ({ nodes }) => {
  const nodesA = nodes.filter(hasAdd)
  return getNodesMap(nodesA)
}

const hasAdd = ({ add }) => add === true

// Returns either `-` or the permission character
const serializeNode = ({ node: { permission }, nodeKey, addedNodes }) => {
  if (addedNodes[nodeKey] !== undefined) {
    return permission
  }

  // Special permissions are contracted into `x`
  if (SPECIAL_PERMISSIONS.has(permission)) {
    return ''
  }

  return NO_PERMISSION
}

const NO_PERMISSION = '-'
