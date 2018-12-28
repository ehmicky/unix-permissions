'use strict'

const { SHORT_CATEGORIES } = require('./constants')
const { parse, parseCategory } = require('./parse')
const { serialize, serializeCategory } = require('./serialize')
const { mapValues } = require('./utils')

// Select the part of the permission related to a specific category
// This results in `catPerm` (instead of `perm`) and uses intermediary
// `catNodes` instead of `nodes`.
// Since `catPerm` misses category-related information, it cannot be used
// as input for any other API function, except `deselect()`.
// Each type exposes `type.serializeCategory()` to perform this operation.
// This leads to some code duplication, which we try to minimize.
const selectCategory = function(category, perm) {
  const { type, nodesMap } = parse(perm)
  const catPerm = serializeCategory(type, nodesMap, category)
  return catPerm
}

// Inverse of `selectCategory()`
const deselectCategory = function(category, catPerm) {
  const { type, nodesMap } = parseCategory(catPerm, category)
  const perm = serialize(type, nodesMap)
  return perm
}

// Transform to `[de]select.CATEGORY()`
const bindCategories = function(func) {
  return mapValues(SHORT_CATEGORIES, category => func.bind(null, category))
}

const select = bindCategories(selectCategory)
const deselect = bindCategories(deselectCategory)

module.exports = {
  select,
  deselect,
}
