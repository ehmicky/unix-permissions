'use strict'

const { isPlainObject } = require('../../utils')
const { CATEGORY_PERMISSIONS } = require('../../constants')

const { SHORT_CATEGORIES, SHORT_PERMISSIONS } = require('./constants')

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

const parsePermissions = function([category, permissions]) {
  const categoryA = SHORT_CATEGORIES[category]

  if (categoryA === undefined) {
    return
  }

  return Object.entries(permissions)
    .filter(hasDefinedValue)
    .map(([permission, add]) =>
      parsePermission({ permission, add, category: categoryA }),
    )
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
}
