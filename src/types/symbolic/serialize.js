'use strict'

const { CATEGORIES, CATEGORY_PERMISSIONS } = require('../../constants')

const {
  OPERATORS,
  OPERATORS: { EQUAL },
  DEFAULT_SERIALIZE,
  DEFAULT_CAT_SERIALIZE,
} = require('./constants')
const { joinCategories } = require('./join')

const serialize = function(nodes) {
  // Noop symbolic format.
  // Empty string is possible as well on intput, but this is clearer in output.
  if (nodes.length === 0) {
    return DEFAULT_SERIALIZE
  }

  const perm = CATEGORIES.map(category =>
    pickCategoryNodes({ category, nodes }),
  )
    .flatMap(serializePart)
    .flatMap(joinCategories)
    .map(stringifyPart)
    .join(',')
  return perm
}

const serializeCategory = function(nodes, category) {
  if (nodes.length === 0) {
    return DEFAULT_CAT_SERIALIZE
  }

  const [{ operator, permissions }] = serializePart({ category, nodes })
  const catPerm = `${operator}${permissions}`
  return catPerm
}

const pickCategoryNodes = function({ category, nodes }) {
  const nodesA = nodes.filter(node => node.category === category)
  return { category, nodes: nodesA }
}

const serializePart = function({ category, nodes }) {
  if (nodes.length === 0) {
    return []
  }

  if (shouldUseEqual({ category, nodes })) {
    return serializeEqualPart({ category, nodes })
  }

  return serializeAddParts({ category, nodes })
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
  return [{ category, operator: EQUAL, permissions }]
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

const stringifyPart = function({ category, operator, permissions }) {
  return `${category}${operator}${permissions}`
}

module.exports = {
  serialize,
  serializeCategory,
}
