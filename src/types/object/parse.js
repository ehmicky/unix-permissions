'use strict'

const { isPlainObject } = require('../../utils')
const { SHORT_CATEGORIES } = require('../../constants')

const { SHORT_PERMISSIONS, SPECIAL_PERMISSIONS } = require('./constants')

// Parse an `object` permission into nodes
const parse = function(object) {
  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObject(object)) {
    return
  }

  const nodes = Object.entries(object).flatMap(parsePermissions)

  if (!validateNodes({ nodes })) {
    return
  }

  return nodes
}

// Parse each `object` category's object into nodes
const parsePermissions = function([category, permissions]) {
  const categoryA = SHORT_CATEGORIES[category]

  // Invalid category name
  if (categoryA === undefined) {
    return
  }

  return parseCategory(permissions, categoryA)
}

const parseCategory = function(permissions, category) {
  // Non-plain objects probably indicate a non-intentional error
  if (!isPlainObject(permissions)) {
    return
  }

  return Object.entries(permissions)
    .filter(hasDefinedValue)
    .map(([permission, add]) => parsePermission({ permission, add, category }))
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
  return nodes.every(validateNode)
}

const validateNode = function(node) {
  return node !== undefined
}

module.exports = {
  parse,
  parseCategory,
}
