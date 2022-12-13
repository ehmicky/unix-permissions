import { CATEGORIES, CATEGORY_PERMISSIONS } from '../../constants.js'

import { joinCategories } from './join.js'

// Serialize from `nodes` to a `symbolic` permission
export const serialize = (nodes) => {
  // Noop symbolic format is `a+`
  // `+` is possible as well on input, but `a+` is clearer in output.
  if (nodes.length === 0) {
    return DEFAULT_SERIALIZE
  }

  const perm = CATEGORIES.map((category) =>
    pickCategoryNodes({ category, nodes }),
  )
    .flatMap(serializePart)
    .flatMap(joinCategories)
    .map(stringifyPart)
    .join(',')
  return perm
}

const DEFAULT_SERIALIZE = 'a+'

// Iterate over each group of nodes by category
const pickCategoryNodes = ({ category, nodes }) => {
  const nodesA = nodes.filter((node) => node.category === category)
  return { category, nodes: nodesA }
}

const serializePart = ({ category, nodes }) => {
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
const shouldUseEqual = ({ category, nodes }) =>
  CATEGORY_PERMISSIONS[category].every((permission) =>
    containsPermission({ nodes, permission }),
  )

const containsPermission = ({ nodes, permission }) =>
  nodes.some((node) => node.permission === permission)

// Serialize permissions with `=` operator
const serializeEqualPart = ({ category, nodes }) => {
  const permissions = nodes.map(serializeEqualPerm).join('')
  return [{ category, operator: OPERATORS.EQUAL, permissions }]
}

const serializeEqualPerm = ({ add, permission }) => {
  if (!add) {
    return ''
  }

  return permission
}

// Serialize permissions with `+` or `-` operator
const serializeAddParts = ({ category, nodes }) =>
  Object.keys(OPERATORS)
    .map((add) => seralizeAddPart({ category, nodes, add }))
    .filter(Boolean)

const seralizeAddPart = ({ category, nodes, add }) => {
  const nodesA = nodes.filter((node) => String(node.add) === add)

  if (nodesA.length === 0) {
    return ''
  }

  const permissions = nodesA.map(({ permission }) => permission).join('')
  return { category, operator: OPERATORS[add], permissions }
}

const stringifyPart = ({ category, operator, permissions }) =>
  `${category}${operator}${permissions}`

const OPERATORS = {
  true: '+',
  false: '-',
  EQUAL: '=',
}
