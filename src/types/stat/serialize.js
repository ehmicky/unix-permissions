import { SPECIAL_PERMISSIONS } from '../../constants.js'
import { NODES_MAP, getNodesMap } from '../../nodes.js'

import { contractSpecial } from './tokenize.js'

// Serialize from `nodes` to a `stat` permission
export const serialize = function(nodes) {
  const addedNodes = getAddedNodes({ nodes })

  const stat = Object.entries(NODES_MAP)
    .map(([nodeKey, node]) => serializeNode({ node, nodeKey, addedNodes }))
    .join('')
  // Special permissions are contracted into `x`
  const statA = contractSpecial(stat)
  return statA
}

// Get a `nodesMap` of the added permissions
const getAddedNodes = function({ nodes }) {
  const nodesA = nodes.filter(hasAdd)
  return getNodesMap(nodesA)
}

const hasAdd = function({ add }) {
  return add === true
}

// Returns either `-` or the permission character
const serializeNode = function({ node: { permission }, nodeKey, addedNodes }) {
  if (addedNodes[nodeKey] !== undefined) {
    return permission
  }

  // Special permissions are contracted into `x`
  if (SPECIAL_PERMISSIONS.includes(permission)) {
    return ''
  }

  return NO_PERMISSION
}

const NO_PERMISSION = '-'
