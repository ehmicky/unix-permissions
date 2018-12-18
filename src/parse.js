/* eslint-disable max-lines */
'use strict'

const assert = require('assert')

const parse = function(flags) {
  assert(flags, `umask must be a string: ${flags}`)

  // eslint-disable-next-line fp/no-mutating-methods
  const groups = flags
    .split(/\s*,\s*/gu)
    .map(group => parseGroup({ group, flags }))
    .map(addDefaults)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
    .filter(isUnique)
    .map(addValue)
    .sort(compareGroups)
  return groups
}

const parseGroup = function({ group, flags }) {
  const tokens = regexp.exec(group)

  assert(tokens !== null, `invalid umask tokens '${group}' in: ${flags}`)

  const [, categories, operator, permissions] = tokens
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

/* eslint-disable no-magic-numbers */
const VALUES = {
  'o x': 2 ** 0,
  'o w': 2 ** 1,
  'o r': 2 ** 2,
  'g x': 2 ** 3,
  'g w': 2 ** 4,
  'g r': 2 ** 5,
  'u x': 2 ** 6,
  'u w': 2 ** 7,
  'u r': 2 ** 8,
}
/* eslint-enable no-magic-numbers */

const compareGroups = function(groupA, groupB) {
  const attributeA = ATTRIBUTES.find(
    attribute => compare(groupA, groupB, attribute) !== 0,
  )

  if (attributeA === undefined) {
    return 0
  }

  return compare(groupA, groupB, attributeA)
}

const ATTRIBUTES = ['add', 'value']

const compare = function(groupA, groupB, attribute) {
  if (groupA[attribute] > groupB[attribute]) {
    return 1
  }

  if (groupA[attribute] < groupB[attribute]) {
    return -1
  }

  return 0
}

const validate = function(flags) {
  return typeof flags === 'string' && flags.split(',').every(testGroup)
}

const testGroup = function(group) {
  return regexp.test(group)
}

const regexp = /^\s*([augo]*)\s*([=+-]?)\s*([xwr]*)\s*$/u

module.exports = {
  parse,
  validate,
  regexp,
}
/* eslint-enable max-lines */
