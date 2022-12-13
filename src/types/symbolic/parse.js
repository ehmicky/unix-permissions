import { CATEGORIES, PERMISSIONS } from '../../constants.js'
import { hasDuplicate } from '../../utils.js'

import { tokenize } from './tokenize.js'

// Parse `symbolic` permissions to nodes
export const parse = (symbolic) => {
  const tokens = tokenize(symbolic)

  if (tokens === undefined || hasDuplicates({ tokens })) {
    return
  }

  const nodes = tokens
    .map(addDefaultCategories)
    .map(normalizeX)
    .flatMap(splitCategories)
    .flatMap(splitAll)
    .flatMap(normalizeOperator)
    .flatMap(splitPermissions)
  return nodes
}

// Duplicate permissions within the same part are not allowed as opposed to
// chmod behavior. Otherwise `stat` permissions with duplicates would be parsed
// as `symbolic`.
const hasDuplicates = ({ tokens }) => tokens.some(hasDuplicatePermissions)

const hasDuplicatePermissions = ({ permissions }) =>
  hasDuplicate([...permissions])

// `=rw` defaults to `a=rw`
const addDefaultCategories = (node) => {
  if (node.categories !== '') {
    return node
  }

  return { ...node, categories: DEFAULT_CATEGORIES }
}

const DEFAULT_CATEGORIES = 'a'

// See `stat` type for an explanation on special permission `X`.
// It is transformed to `x`.
const normalizeX = ({ permissions, ...node }) => {
  const permissionsA = permissions.replace(X_REGEXP, 'x')
  return { ...node, permissions: permissionsA }
}

const X_REGEXP = /X/gu

// Several categories can be grouped, e.g. `gu=x`.
// Duplicates are allowed.
const splitCategories = ({ categories, operator, permissions }) =>
  [...categories].map((category) => ({
    category,
    operator,
    permissions,
  }))

// `a` category is the same as `rwx`
const splitAll = ({ category, operator, permissions }) => {
  if (category !== 'a') {
    return { category, operator, permissions }
  }

  return CATEGORIES.map((categoryA) => ({
    category: categoryA,
    operator,
    permissions,
  }))
}

// Transform operator to `node.add`
const normalizeOperator = ({ operator, permissions, ...node }) => {
  if (operator === '+') {
    return [{ ...node, permissions, add: true }]
  }

  if (operator === '-') {
    return [{ ...node, permissions, add: false }]
  }

  // `=` operator results in a mix of `+` and `-`
  return PERMISSIONS.map((permission) => ({
    ...node,
    permissions: permission,
    add: permissions.includes(permission),
  }))
}

// Several permissions per part can be used, e.g. `a=rw`
const splitPermissions = ({ permissions, add, ...node }) => {
  if (permissions === '') {
    return []
  }

  return [...permissions].map((permission) => ({ ...node, permission, add }))
}
