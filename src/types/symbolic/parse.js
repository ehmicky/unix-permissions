'use strict'

const { CATEGORIES, PERMISSIONS } = require('../../constants')

const { DEFAULT_OPERATOR, DEFAULT_CATEGORIES } = require('./constants')
const { tokenize, tokenizeCategory } = require('./tokenize')

const name = 'symbolic'

const parse = function(symbolic) {
  const tokens = tokenize(symbolic)

  if (tokens === undefined) {
    return
  }

  const nodes = tokens
    .map(addDefaultCategories)
    .map(addDefaultOperator)
    .map(normalizeX)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
  return nodes
}

const parseCategory = function(part) {
  const node = tokenizeCategory(part)

  if (node === undefined) {
    return
  }

  const nodeA = addDefaultOperator(node)
  const nodeB = normalizeX(nodeA)
  const nodes = normalizeOperator(nodeB).flatMap(splitPermissions)
  return nodes
}

const addDefaultCategories = function(node) {
  const categories = ifEmpty(node.categories, DEFAULT_CATEGORIES)
  return { ...node, categories }
}

const addDefaultOperator = function(node) {
  const operator = ifEmpty(node.operator, DEFAULT_OPERATOR)
  return { ...node, operator }
}

const ifEmpty = function(string, defaultValue) {
  return string === '' ? defaultValue : string
}

const normalizeX = function({ permissions, ...node }) {
  const permissionsA = permissions.replace(X_REGEXP, 'x')
  return { ...node, permissions: permissionsA }
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

const normalizeOperator = function({ operator, permissions, ...node }) {
  if (operator === '+') {
    return [{ ...node, permissions, add: true }]
  }

  if (operator === '-') {
    return [{ ...node, permissions, add: false }]
  }

  return PERMISSIONS.map(permission => ({
    ...node,
    permissions: permission,
    add: permissions.includes(permission),
  }))
}

const splitPermissions = function({ permissions, add, ...node }) {
  if (permissions === '') {
    return []
  }

  return permissions.split('').map(permission => ({ ...node, permission, add }))
}

module.exports = {
  name,
  parse,
  parseCategory,
}
