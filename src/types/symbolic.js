/* eslint-disable max-lines */
'use strict'

const {
  VALUES_MAP,
  PERMISSION_CATEGORIES,
  CATEGORY_PERMISSIONS,
  CATEGORIES,
  PERMISSIONS,
  ADDS,
} = require('../values')
const { uniq } = require('../utils')

const name = 'symbolic'

const test = function(perm) {
  return perm.split(COMMA_REGEXP).every(testGroup)
}

const testGroup = function(group) {
  return GROUP_REGEXP.test(group)
}

const COMMA_REGEXP = /\s*,\s*/gu
const GROUP_REGEXP = /^\s*([augo]*)\s*([=+-]?)\s*([xwrXst]*)\s*$/u

const parse = function(symbolic) {
  // eslint-disable-next-line fp/no-mutating-methods
  const tokens = symbolic
    .split(COMMA_REGEXP)
    .map(parseGroup)
    .map(addDefaults)
    .map(normalizeX)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
    .filter(filterInvalidFlag)
    .map(addValue)
    .filter(isUnique)
    .sort(compareTokens)
  return tokens
}

const parseGroup = function(group) {
  const [, categories, operator, permissions] = GROUP_REGEXP.exec(group)
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

const addValue = function({ category, permission, add }) {
  const { value, order } = VALUES_MAP[`${category} ${permission}`]
  return { category, permission, add, value, order }
}

const isUnique = function(value, index, array) {
  return !array.slice(index + 1).some(valueB => hasSameValue(value, valueB))
}

const hasSameValue = function(valueA, valueB) {
  return valueA.value === valueB.value
}

const compareTokens = function(tokenA, tokenB) {
  if (tokenA.order > tokenB.order) {
    return 1
  }

  if (tokenA.order < tokenB.order) {
    return -1
  }

  return 0
}

const serialize = function(tokens) {
  const tokensA = tokens.flatMap(joinCategories)
  const allCategories = getAllCategories({ tokens: tokensA })
  const perm = allCategories
    .flatMap(categories => serializeGroup({ categories, tokens: tokensA }))
    .join(',')
  return perm
}

const joinCategories = function({ category, ...token }, index, tokens) {
  const sameTokens = Object.entries(tokens).filter(([, tokenB]) =>
    canJoinTokens(token, tokenB),
  )

  if (Number(sameTokens[0][0]) !== index) {
    return []
  }

  const categories = sameTokens.map(([, tokenA]) => tokenA.category).join('')
  const permissionCategories = PERMISSION_CATEGORIES[token.permission]

  if (categories.length === permissionCategories.length) {
    return { ...token, categories: 'a' }
  }

  if (categories.length === 1) {
    return { ...token, categories: category }
  }

  return { ...token, categories }
}

const canJoinTokens = function(tokenA, tokenB) {
  return tokenA.permission === tokenB.permission && tokenA.add === tokenB.add
}

const getAllCategories = function({ tokens }) {
  const allCategoriesA = tokens.map(({ categories }) => categories)
  const allCategoriesB = uniq(allCategoriesA)
  return allCategoriesB
}

const serializeGroup = function({ categories, tokens }) {
  const tokensA = tokens.filter(token => token.categories === categories)

  if (tokensA.length === 0) {
    return []
  }

  if (shouldUseEqual({ categories, tokens: tokensA })) {
    return serializeEqualGroup({ categories, tokens: tokensA })
  }

  return serializeAddGroups({ categories, tokens: tokensA })
}

const shouldUseEqual = function({ categories, tokens }) {
  const permissions = categories
    .split('')
    .flatMap(category => CATEGORY_PERMISSIONS[category])
  const permissionsA = uniq(permissions)
  return permissionsA.every(permission =>
    containsPermission({ tokens, permission }),
  )
}

const containsPermission = function({ tokens, permission }) {
  return tokens.some(token => token.permission === permission)
}

const serializeEqualGroup = function({ categories, tokens }) {
  const group = tokens.map(serializeEqualPerm).join('')
  const groupA = `${categories}=${group}`
  return groupA
}

const serializeEqualPerm = function({ add, permission }) {
  if (!add) {
    return ''
  }

  return permission
}

const serializeAddGroups = function({ categories, tokens }) {
  return Object.keys(ADDS)
    .map(add => seralizeAddGroup({ categories, tokens, add }))
    .filter(Boolean)
}

const seralizeAddGroup = function({ categories, tokens, add }) {
  const tokensA = tokens.filter(token => String(token.add) === add)

  if (tokensA.length === 0) {
    return ''
  }

  const group = tokensA.map(({ permission }) => permission).join('')
  const groupA = `${categories}${ADDS[add]}${group}`
  return groupA
}

module.exports = {
  name,
  test,
  parse,
  serialize,
}
/* eslint-enable max-lines */
