const { LONG_CATEGORIES } = require('../../constants')
const { groupBy, mapValues } = require('../../utils')
const { getNodeKey } = require('../../nodes')

const {
  LONG_PERMISSIONS,
  SPECIAL_CATEGORY,
  SERIALIZE_SPECIAL,
} = require('./constants')
const { compareNodes } = require('./sort')

// Serialize from `nodes` to a `object` permission.
// Never serialize to `all` category so make output more predictable.
const serialize = function(nodes) {
  // eslint-disable-next-line fp/no-mutating-methods
  const nodesA = nodes.map(serializeNode).sort(compareNodes)
  const object = groupBy(nodesA, 'category')
  const objectA = mapValues(object, mergePerms)
  return objectA
}

// Serialize each node
const serializeNode = function(node) {
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

const getSpecialPerm = function({ node }) {
  const nodeKey = getNodeKey(node)
  return SERIALIZE_SPECIAL[nodeKey]
}

// Convert to object form
const mergePerms = function(perms) {
  const permsA = perms.map(normalizePerm)
  return Object.assign({}, ...permsA)
}

const normalizePerm = function({ permission, add }) {
  return { [permission]: add }
}

module.exports = {
  serialize,
}
