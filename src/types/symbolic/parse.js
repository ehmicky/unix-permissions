/* eslint-disable max-lines */
'use strict'

const {
  TOKENS_MAP,
  PERMISSION_CATEGORIES,
  CATEGORIES,
  PERMISSIONS,
} = require('../../tokens')

const { COMMA_REGEXP, GROUP_REGEXP } = require('./regexp')

const parse = function(symbolic) {
  // eslint-disable-next-line fp/no-mutating-methods
  const tokens = symbolic
    .split(COMMA_REGEXP)
    .map(parsePart)
    .map(addDefaults)
    .map(normalizeX)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
    .filter(filterInvalidFlag)
    .filter(isUnique)
    .sort(compareTokens)
  return tokens
}

const parsePart = function(part) {
  const [, categories, operator, permissions] = GROUP_REGEXP.exec(part)
  return { categories, operator, permissions }
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

const isUnique = function(token, index, array) {
  return !array.slice(index + 1).some(tokenB => isSameToken(token, tokenB))
}

const isSameToken = function(tokenA, tokenB) {
  return (
    tokenA.category === tokenB.category &&
    tokenA.permission === tokenB.permission
  )
}

const compareTokens = function(tokenA, tokenB) {
  const { order: orderA } = TOKENS_MAP[
    `${tokenA.category} ${tokenA.permission}`
  ]
  const { order: orderB } = TOKENS_MAP[
    `${tokenB.category} ${tokenB.permission}`
  ]

  if (orderA > orderB) {
    return 1
  }

  if (orderA < orderB) {
    return -1
  }

  return 0
}

module.exports = {
  parse,
}
/* eslint-enable max-lines */
