/* eslint-disable max-lines */
'use strict'

const { VALUES } = require('../constants')

const name = 'symbolic'

const test = function(perm) {
  return perm.split(COMMA_REGEXP).every(testGroup)
}

const testGroup = function(group) {
  return GROUP_REGEXP.test(group)
}

const COMMA_REGEXP = /\s*,\*/gu
const GROUP_REGEXP = /^\s*([augo]*)\s*([=+-]?)\s*([xwr]*)\s*$/u

const parse = function(symbolic) {
  const groups = symbolic
    .split(COMMA_REGEXP)
    .map(parseGroup)
    .map(addDefaults)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
    .filter(isUnique)
    .map(addValue)
  return groups
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

const splitCategories = function({ categories, operator, permissions }) {
  return categories
    .split('')
    .map(category => ({ category, operator, permissions }))
}

const splitAll = function({ category, operator, permissions }) {
  if (category !== 'a') {
    return { category, operator, permissions }
  }

  return ['u', 'g', 'o'].map(categoryA => ({
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

  return ['x', 'w', 'r'].map(permission => ({
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

const isUnique = function(value, index, array) {
  return !array.slice(index + 1).some(valueB => isSameGroup(value, valueB))
}

const isSameGroup = function(valueA, valueB) {
  return (
    valueA.category === valueB.category &&
    valueA.permission === valueB.permission
  )
}

const addValue = function({ category, permission, add }) {
  const value = getValue({ category, permission })
  return { category, permission, add, value }
}

const getValue = function({ category, permission }) {
  return VALUES[`${category} ${permission}`]
}

const serialize = function(tokens) {
  return tokens
}

module.exports = {
  name,
  test,
  parse,
  serialize,
}
/* eslint-enable max-lines */
