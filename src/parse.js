'use strict'

const { TYPES } = require('./types')
const { getNodesMap, NODES_MAP } = require('./nodes')
const { isPlainObject, omitBy } = require('./utils')

// Parse permission to a `nodesMap`
// `nodesMap` uses an intermediary/internal format to facilitate conversions
// between types.
// Guesses permission type by trying each `type.parse()` in order, and using
// the first one that does not return `undefined`
const parse = function(perm) {
  const { type, nodes } = TYPES.reduce(parseReduce.bind(null, perm), {})

  validateNodes({ nodes, perm })

  const nodesMap = normalizeNodes({ nodes })

  return { type, nodesMap }
}

const parseReduce = function(perm, memo, type) {
  if (memo.nodes !== undefined) {
    return memo
  }

  const nodes = type.parse(perm)
  return { type, nodes }
}

// When we tried each type and none matched, we throw an error
const validateNodes = function({ nodes, perm }) {
  if (nodes !== undefined) {
    return
  }

  const permA = isPlainObject(perm) ? JSON.stringify(perm) : perm
  throw new Error(`Permissions syntax is invalid: ${permA}`)
}

const normalizeNodes = function({ nodes }) {
  const nodesMap = getNodesMap(nodes)
  const nodesMapA = omitBy(nodesMap, isInvalidNode)
  return nodesMapA
}

// Exclude special flags not valid for current category
const isInvalidNode = function(node, nodeKey) {
  return NODES_MAP[nodeKey] === undefined
}

module.exports = {
  parse,
}
