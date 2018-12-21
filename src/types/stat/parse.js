'use strict'

const { CATEGORIES } = require('../../nodes')

const { tokenize } = require('./tokenize')

const name = 'stat'

const parse = function(stat) {
  const tokens = tokenize(stat)

  if (tokens === undefined || hasDuplicates({ tokens })) {
    return
  }

  const nodes = CATEGORIES.map(category => getCategory({ category, tokens }))
    .flatMap(addPermissions)
    .map(addAdd)
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
  return { category, tokens: tokens[category] }
}

const addPermissions = function({ category, tokens }) {
  return tokens.split('').map(permission => ({ category, permission }))
}

const addAdd = function({ category, permission }) {
  return { category, permission, add: true }
}

module.exports = {
  name,
  parse,
}
