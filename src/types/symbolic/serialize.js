import { CATEGORIES, CATEGORY_PERMISSIONS } from '../../constants'

import { OPERATORS, DEFAULT_SERIALIZE } from './constants'
import { joinCategories } from './join.js'

const { EQUAL } = OPERATORS

// Serialize from `nodes` to a `symbolic` permission
export const serialize = function(nodes) {
  // Noop symbolic format is `a+`
  // `+` is possible as well on input, but `a+` is clearer in output.
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

// Iterate over each group of nodes by category
const pickCategoryNodes = function({ category, nodes }) {
  const nodesA = nodes.filter(node => node.category === category)
  return { category, nodes: nodesA }
}

const serializePart = function({ category, nodes }) {
  // No permissions for this category
  if (nodes.length === 0) {
    return []
  }

  if (shouldUseEqual({ category, nodes })) {
    return serializeEqualPart({ category, nodes })
  }

  return serializeAddParts({ category, nodes })
}

// Should use `=` operator if all permissions for this category are either
// set or unset.
const shouldUseEqual = function({ category, nodes }) {
  return CATEGORY_PERMISSIONS[category].every(permission =>
    containsPermission({ nodes, permission }),
  )
}

const containsPermission = function({ nodes, permission }) {
  return nodes.some(node => node.permission === permission)
}

// Serialize permissions with `=` operator
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

// Serialize permissions with `+` or `-` operator
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
