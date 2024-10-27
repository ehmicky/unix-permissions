import { LONG_CATEGORIES } from '../../constants.js'
import { getNodeKey } from '../../nodes.js'
import { groupBy, mapValues } from '../../utils.js'

import {
  LONG_PERMISSIONS,
  SPECIAL_CATEGORY,
  SERIALIZE_SPECIAL,
} from './constants.js'
import { compareNodes } from './sort.js'

// Serialize from `nodes` to a `object` permission.
// Never serialize to `all` category so make output more predictable.
export const serialize = (nodes) => {
  const nodesA = nodes.map(serializeNode).sort(compareNodes)
  const object = groupBy(nodesA, 'category')
  const objectA = mapValues(object, mergePerms)
  return objectA
}

// Serialize each node
const serializeNode = (node) => {
  // Handle `special` permissions
  const specialPerm = getSpecialPerm({ node })

  if (specialPerm !== undefined) {
    return { ...node, category: SPECIAL_CATEGORY, permission: specialPerm }
  }

  // From short names to long names
  const category = LONG_CATEGORIES[node.category]
  const permission = LONG_PERMISSIONS[node.permission]
  return { ...node, category, permission }
}

const getSpecialPerm = ({ node }) => {
  const nodeKey = getNodeKey(node)
  return SERIALIZE_SPECIAL[nodeKey]
}

// Convert to object form
const mergePerms = (perms) => {
  const permsA = perms.map(normalizePerm)
  return Object.assign({}, ...permsA)
}

const normalizePerm = ({ permission, add }) => ({ [permission]: add })
