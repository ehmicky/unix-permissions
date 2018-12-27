'use strict'

const { CATEGORIES } = require('../../constants')

const { tokenize, tokenizeCategory } = require('./tokenize')

const name = 'stat'

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

  if (part === undefined || hasDuplicate(part)) {
    return
  }

  const nodes = addPermissions({ part })
  return nodes
}

const hasDuplicates = function({ tokens }) {
  return Object.values(tokens).some(hasDuplicate)
}

const hasDuplicate = function(string) {
  return string.split('').some(isDuplicate)
}

const isDuplicate = function(char, index, chars) {
  return chars.slice(index + 1).some(charB => char === charB)
}

const getCategory = function({ category, tokens }) {
  return { category, part: tokens[category] }
}

const parseNode = function({ category, part }) {
  const nodes = addPermissions({ part })
  const nodesA = nodes.map(node => ({ ...node, category }))
  return nodesA
}

const addPermissions = function({ part }) {
  return part.split('').map(addPermission)
}

const addPermission = function(permission) {
  return { permission, add: true }
}

module.exports = {
  name,
  parse,
  parseCategory,
}
