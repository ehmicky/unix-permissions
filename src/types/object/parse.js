import isPlainObj from 'is-plain-obj'

import { SHORT_CATEGORIES } from '../../constants.js'
import { mapValues } from '../../utils.js'

import {
  SHORT_PERMISSIONS,
  SPECIAL_CATEGORY,
  PARSE_SPECIAL,
} from './constants.js'

// Parse an `object` permission into nodes
export const parse = (object) => {
  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObj(object)) {
    return
  }

  const objectA = parseAll(object)

  const nodes = Object.entries(objectA).flatMap(parsePermissions)

  return validateNodes({ nodes })
}

// `all` is a shortcut for all categories
const parseAll = ({ all, ...object }) => {
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
const parsePermissions = ([category, permissions]) => {
  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObj(permissions)) {
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

const getCategory = ({ category }) => {
  if (category === SPECIAL_CATEGORY) {
    return category
  }

  return SHORT_CATEGORIES[category]
}

// `undefined` values e.g. `{ user: { read: undefined } }` result is no nodes.
const hasDefinedValue = ([, value]) => value !== undefined

const parsePermission = ({ category, permission, add }) => {
  // Permission values must be `undefined`, `true` or `false`
  if (typeof add !== 'boolean') {
    return
  }

  if (category === SPECIAL_CATEGORY) {
    return parseSpecialPerm({ permission, add })
  }

  return parseNormalPerm({ category, permission, add })
}

const parseSpecialPerm = ({ permission, add }) => {
  const specialNode = PARSE_SPECIAL[permission]

  if (specialNode === undefined) {
    return
  }

  return { ...specialNode, add }
}

const parseNormalPerm = ({ category, permission, add }) => {
  const permissionA = SHORT_PERMISSIONS[permission]

  // Invalid permission name
  if (permissionA === undefined) {
    return
  }

  return { category, permission: permissionA, add }
}

const validateNodes = ({ nodes }) => {
  if (nodes.some(isInvalidNode)) {
    return
  }

  return nodes
}

const isInvalidNode = (node) => node === undefined
