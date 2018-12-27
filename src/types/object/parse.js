'use strict'

const { isPlainObject } = require('../../utils')
const { SHORT_CATEGORIES, CATEGORY_PERMISSIONS } = require('../../constants')

const { SHORT_PERMISSIONS } = require('./constants')

const name = 'object'

const parse = function(object) {
  if (!isPlainObject(object)) {
    return
  }

  const nodes = Object.entries(object).flatMap(parsePermissions)

  if (!validateNodes({ nodes })) {
    return
  }

  return nodes
}

const parseCategory = function(permissions, category) {
  if (!isPlainObject(permissions)) {
    return
  }

  const catNodes = getPermissions({ category, permissions })
  return catNodes
}

const parsePermissions = function([category, permissions]) {
  const categoryA = SHORT_CATEGORIES[category]

  if (categoryA === undefined) {
    return
  }

  return getPermissions({ category, permissions })
}

const getPermissions = function({ category, permissions }) {
  return Object.entries(permissions)
    .filter(hasDefinedValue)
    .map(([permission, add]) => parsePermission({ permission, add, category }))
}

const hasDefinedValue = function([, value]) {
  return value !== undefined
}

const parsePermission = function({ permission, add, category }) {
  const permissionA = SHORT_PERMISSIONS[permission]

  if (permissionA === undefined) {
    return
  }

  const isValidPermission = CATEGORY_PERMISSIONS[category].includes(permissionA)

  if (!isValidPermission) {
    return
  }

  return { category, permission: permissionA, add }
}

const validateNodes = function({ nodes }) {
  return nodes.every(validateNode)
}

const validateNode = function(node) {
  return node !== undefined
}

module.exports = {
  name,
  parse,
  parseCategory,
}
