'use strict'

const { LONG_CATEGORIES } = require('./constants')
const { parse, parseCategory } = require('./parse')
const { serialize, serializeCategory } = require('./serialize')

const selectCategory = function(category, perm) {
  const { type, nodesMap } = parse(perm)
  const catPerm = serializeCategory(type, nodesMap, category)
  return catPerm
}

const deselectCategory = function(category, catPerm) {
  const { type, nodesMap } = parseCategory(catPerm, category)
  const perm = serialize(type, nodesMap)
  return perm
}

const bindCategories = function(func) {
  const pairs = Object.entries(LONG_CATEGORIES).map(
    ([category, longCategory]) => ({
      [longCategory]: func.bind(null, category),
    }),
  )
  return Object.assign({}, ...pairs)
}

const select = bindCategories(selectCategory)
const deselect = bindCategories(deselectCategory)

module.exports = {
  select,
  deselect,
}
