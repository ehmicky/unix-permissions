'use strict'

const { CATEGORIES } = require('../../constants')
const { hasDuplicate } = require('../../utils')

const { tokenize, tokenizeCategory } = require('./tokenize')

// Parse a `stat` permission to `nodes`
const parse = function(stat) {
  const tokens = tokenize(stat)

  if (tokens === undefined || hasDuplicates({ tokens })) {
    return
  }

  const nodes = CATEGORIES.map(category =>
    getCategory({ category, tokens }),
  ).flatMap(parseNode)
  return nodes
}

const parseCategory = function(catStat) {
  const part = tokenizeCategory(catStat)

  if (part === undefined || hasDuplicateChars(part)) {
    return
  }

  const nodes = addPermissions({ part })
  return nodes
}

// We do not allow duplicates within a category as it indicates typos
const hasDuplicates = function({ tokens }) {
  return Object.values(tokens).some(hasDuplicateChars)
}

const hasDuplicateChars = function(string) {
  return hasDuplicate(string.split(''))
}

// Retrieve the permissions for each category
const getCategory = function({ category, tokens }) {
  return { category, part: tokens[category] }
}

// Parse a category's permission to `nodes`
const parseNode = function({ category, part }) {
  const nodes = addPermissions({ part })
  const nodesA = nodes.map(node => ({ ...node, category }))
  return nodesA
}

// `stat` does not allow distinguishing between `add: undefined` and
// `add: false`
const addPermissions = function({ part }) {
  return part.split('').map(addPermission)
}

const addPermission = function(permission) {
  return { permission, add: true }
}

module.exports = {
  parse,
  parseCategory,
}
