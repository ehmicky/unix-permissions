'use strict'

const { NODES, CAT_NODES } = require('../../constants')
const { hasDuplicate } = require('../../utils')

const { tokenize, tokenizeCategory } = require('./tokenize')

// Parse a `stat` permission to `nodes`
const parse = function(stat) {
  const tokens = tokenize(stat)

  if (tokens === undefined || hasDuplicates({ tokens })) {
    return
  }

  return NODES.map(node => parseNode({ node, tokens }))
}

const parseCategory = function(catStat) {
  const part = tokenizeCategory(catStat)

  if (part === undefined || hasDuplicateChars(part)) {
    return
  }

  return CAT_NODES.map(node => parsePart({ node, part }))
}

// We do not allow duplicates within a category as it indicates typos
const hasDuplicates = function({ tokens }) {
  return Object.values(tokens).some(hasDuplicateChars)
}

const hasDuplicateChars = function(string) {
  return hasDuplicate(string.split(''))
}

// Parse a `stat` character to a single `node`
const parseNode = function({ node, node: { category }, tokens }) {
  const part = tokens[category]
  return parsePart({ node, part })
}

const parsePart = function({ node, node: { permission }, part }) {
  const add = part.includes(permission)
  return { ...node, add }
}

module.exports = {
  parse,
  parseCategory,
}
