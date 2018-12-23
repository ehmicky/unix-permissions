/* eslint-disable max-lines */
'use strict'

const { CATEGORIES, PERMISSIONS } = require('../../constants')
const { getNode, PERMISSION_CATEGORIES } = require('../../nodes')

const { tokenize } = require('./tokenize')

const name = 'symbolic'

const parse = function(symbolic) {
  const tokens = tokenize(symbolic)

  if (tokens === undefined) {
    return
  }

  // eslint-disable-next-line fp/no-mutating-methods
  const nodes = tokens
    .map(addDefaults)
    .map(normalizeX)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
    .filter(filterInvalidFlag)
    .filter(isUnique)
    .sort(compareNodes)
  return nodes
}

const addDefaults = function({ categories, operator, permissions }) {
  return {
    categories: ifEmpty(categories, DEFAULT_CATEGORIES),
    operator: ifEmpty(operator, DEFAULT_OPERATOR),
    permissions,
  }
}

const ifEmpty = function(string, defaultValue) {
  return string === '' ? defaultValue : string
}

const DEFAULT_CATEGORIES = 'a'
const DEFAULT_OPERATOR = '='

const normalizeX = function({ categories, operator, permissions }) {
  const permissionsA = permissions.replace(X_REGEXP, 'x')
  return { categories, operator, permissions: permissionsA }
}

const X_REGEXP = /X/gu

const splitCategories = function({ categories, operator, permissions }) {
  return categories
    .split('')
    .map(category => ({ category, operator, permissions }))
}

const splitAll = function({ category, operator, permissions }) {
  if (category !== 'a') {
    return { category, operator, permissions }
  }

  return CATEGORIES.map(categoryA => ({
    category: categoryA,
    operator,
    permissions,
  }))
}

const normalizeOperator = function({ category, operator, permissions }) {
  if (operator === '+') {
    return { category, permissions, add: true }
  }

  if (operator === '-') {
    return { category, permissions, add: false }
  }

  return PERMISSIONS.map(permission => ({
    category,
    permissions: permission,
    add: permissions.includes(permission),
  }))
}

const splitPermissions = function({ category, permissions, add }) {
  if (permissions === '') {
    return []
  }

  return permissions
    .split('')
    .map(permission => ({ category, permission, add }))
}

const filterInvalidFlag = function({ category, permission }) {
  return PERMISSION_CATEGORIES[permission].includes(category)
}

const isUnique = function(node, index, array) {
  return !array.slice(index + 1).some(nodeB => isSameNode(node, nodeB))
}

const isSameNode = function(nodeA, nodeB) {
  return (
    nodeA.category === nodeB.category && nodeA.permission === nodeB.permission
  )
}

const compareNodes = function(nodeA, nodeB) {
  const { order: orderA } = getNode(nodeA)
  const { order: orderB } = getNode(nodeB)

  if (orderA > orderB) {
    return 1
  }

  if (orderA < orderB) {
    return -1
  }

  return 0
}

module.exports = {
  name,
  parse,
}
/* eslint-enable max-lines */
