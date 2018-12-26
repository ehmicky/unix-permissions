'use strict'

const { SHORT_CATEGORIES } = require('./constants')
const { parse, parseCategory } = require('./parse')
const { serialize, serializeCategory } = require('./serialize')
const { mapValues } = require('./utils')

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
  return mapValues(SHORT_CATEGORIES, category => func.bind(null, category))
}

const select = bindCategories(selectCategory)
const deselect = bindCategories(deselectCategory)

module.exports = {
  select,
  deselect,
}
