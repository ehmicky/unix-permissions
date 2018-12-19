/* eslint-disable max-lines */
'use strict'

const {
  VALUES_MAP,
  PERMISSION_CATEGORIES,
  CATEGORIES,
  PERMISSIONS,
} = require('../../values')

const { COMMA_REGEXP, GROUP_REGEXP } = require('./regexp')

const parse = function(symbolic) {
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

module.exports = {
  parse,
}
/* eslint-enable max-lines */
