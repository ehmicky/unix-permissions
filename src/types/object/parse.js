import { isPlainObject, mapValues } from '../../utils.js'
import { SHORT_CATEGORIES } from '../../constants'

import {
  SHORT_PERMISSIONS,
  SPECIAL_CATEGORY,
  PARSE_SPECIAL,
  ALL_CATEGORY,
} from './constants'

// Parse an `object` permission into nodes
export const parse = function(object) {
  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObject(object)) {
    return
  }

  const objectA = parseAll(object)

  const nodes = Object.entries(objectA).flatMap(parsePermissions)

  return validateNodes({ nodes })
}

// `all` is a shortcut for all categories
const parseAll = function({ [ALL_CATEGORY]: all, ...object }) {
  if (all === undefined) {
    return object
  }

  // `all` has lower priority
  const objectA = mapValues(SHORT_CATEGORIES, (value, category) => ({
    ...all,
    ...object[category],
  }))
  return { ...object, ...objectA }
}

// Parse each `object` category's object into nodes
const parsePermissions = function([category, permissions]) {
  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObject(permissions)) {
    return
  }

  const categoryA = getCategory({ category })

  // Invalid category name
  if (categoryA === undefined) {
    return
  }

  const nodes = Object.entries(permissions)
    .filter(hasDefinedValue)
    .map(([permission, add]) =>
      parsePermission({ category: categoryA, permission, add }),
    )

  return validateNodes({ nodes })
}

const getCategory = function({ category }) {
  if (category === SPECIAL_CATEGORY) {
    return category
  }

  return SHORT_CATEGORIES[category]
}

// `undefined` values e.g. `{ user: { read: undefined } }` result is no nodes.
const hasDefinedValue = function([, value]) {
  return value !== undefined
}

const parsePermission = function({ category, permission, add }) {
  // Permission values must be `undefined`, `true` or `false`
  if (typeof add !== 'boolean') {
    return
  }

  if (category === SPECIAL_CATEGORY) {
    return parseSpecialPerm({ permission, add })
  }

  return parseNormalPerm({ category, permission, add })
}

const parseSpecialPerm = function({ permission, add }) {
  const specialNode = PARSE_SPECIAL[permission]

  if (specialNode === undefined) {
    return
  }

  return { ...specialNode, add }
}

const parseNormalPerm = function({ category, permission, add }) {
  const permissionA = SHORT_PERMISSIONS[permission]

  // Invalid permission name
  if (permissionA === undefined) {
    return
  }

  return { category, permission: permissionA, add }
}

const validateNodes = function({ nodes }) {
  if (nodes.some(isInvalidNode)) {
    return
  }

  return nodes
}

const isInvalidNode = function(node) {
  return node === undefined
}
