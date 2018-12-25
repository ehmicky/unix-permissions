'use strict'

const { CATEGORIES, CATEGORY_PERMISSIONS } = require('../../constants')

const {
  OPERATORS,
  OPERATORS: { EQUAL },
  DEFAULT_SERIALIZE,
} = require('./constants')

const serialize = function(nodes) {
  // Noop symbolic format.
  // Empty string is possible as well on intput, but this is clearer in output.
  if (nodes.length === 0) {
    return DEFAULT_SERIALIZE
  }

  const perm = CATEGORIES.flatMap(category =>
    serializePart({ category, nodes }),
  )
    .flatMap(joinCategories)
    .map(stringifyPart)
    .join(',')
  return perm
}

const serializePart = function({ category, nodes }) {
  const nodesA = nodes.filter(node => node.category === category)

  if (nodesA.length === 0) {
    return []
  }

  if (shouldUseEqual({ category, nodes: nodesA })) {
    return serializeEqualPart({ category, nodes: nodesA })
  }

  return serializeAddParts({ category, nodes: nodesA })
}

const shouldUseEqual = function({ category, nodes }) {
  return CATEGORY_PERMISSIONS[category].every(permission =>
    containsPermission({ nodes, permission }),
  )
}

const containsPermission = function({ nodes, permission }) {
  return nodes.some(node => node.permission === permission)
}

const serializeEqualPart = function({ category, nodes }) {
  const permissions = nodes.map(serializeEqualPerm).join('')
  return { category, operator: EQUAL, permissions }
}

const serializeEqualPerm = function({ add, permission }) {
  if (!add) {
    return ''
  }

  return permission
}

const serializeAddParts = function({ category, nodes }) {
  return Object.keys(OPERATORS)
    .map(add => seralizeAddPart({ category, nodes, add }))
    .filter(Boolean)
}

const seralizeAddPart = function({ category, nodes, add }) {
  const nodesA = nodes.filter(node => String(node.add) === add)

  if (nodesA.length === 0) {
    return ''
  }

  const permissions = nodesA.map(({ permission }) => permission).join('')
  return { category, operator: OPERATORS[add], permissions }
}

const joinCategories = function(node, index, nodes) {
  const sameNodes = nodes.filter(nodeA => canJoinNodes(node, nodeA))

  if (sameNodes.length === 1) {
    return node
  }

  const categories = sameNodes.map(nodeA => nodeA.category)

  if (categories[0] !== node.category) {
    return []
  }

  if (categories.length === CATEGORIES.length) {
    return { ...node, category: 'a' }
  }

  return { ...node, category: categories.join('') }
}

const canJoinNodes = function(nodeA, nodeB) {
  return (
    nodeA.operator === nodeB.operator && nodeA.permissions === nodeB.permissions
  )
}

const stringifyPart = function({ category, operator, permissions }) {
  return `${category}${operator}${permissions}`
}

module.exports = {
  serialize,
}
