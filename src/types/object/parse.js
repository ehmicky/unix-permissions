'use strict'

const { isPlainObject, mapValues } = require('../../utils')
const { SHORT_CATEGORIES } = require('../../constants')

const {
  SHORT_PERMISSIONS,
  SPECIAL_PERMISSIONS,
  ALL_CATEGORY,
} = require('./constants')

// Parse an `object` permission into nodes
const parse = function(object) {
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
  return mapValues(SHORT_CATEGORIES, (value, category) => ({
    ...all,
    ...object[category],
  }))
}

// Parse each `object` category's object into nodes
const parsePermissions = function([category, permissions]) {
  const categoryA = SHORT_CATEGORIES[category]

  // Invalid category name
  if (categoryA === undefined) {
    return
  }

  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObject(permissions)) {
    return
  }

  const nodes = Object.entries(permissions)
    .filter(hasDefinedValue)
    .map(([permission, add]) =>
      parsePermission({ permission, add, category: categoryA }),
    )

  return validateNodes({ nodes })
}

// `undefined` values e.g. `{ user: { read: undefined } }` result is no nodes.
const hasDefinedValue = function([, value]) {
  return value !== undefined
}

const parsePermission = function({ permission, add, category }) {
  if (isInvalidSpecial({ permission, category })) {
    return
  }

  const permissionA = SHORT_PERMISSIONS[permission]

  // Invalid permission name
  if (permissionA === undefined) {
    return
  }

  // Permissin values must be `undefined`, `true` or `false`
  if (typeof add !== 'boolean') {
    return
  }

  return { category, permission: permissionA, add }
}

// Make sure special permissions are assigned to a category that supports them
const isInvalidSpecial = function({ permission, category }) {
  const specialCategory = SPECIAL_PERMISSIONS[permission]

  return specialCategory !== undefined && specialCategory !== category
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

module.exports = {
  parse,
}
