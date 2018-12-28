'use strict'

const { TYPES } = require('./types')
const { getNodesMap, NODES_MAP } = require('./nodes')
const { isPlainObject, omitBy } = require('./utils')

// Parse permission to a `nodesMap`
// Guesses permission type by trying each `type.parse()` in order, and using
// the first one that does not return `undefined`
const parse = function(perm) {
  const { type, nodes } = parsePerm({ perm, funcName: 'parse' })
  const nodesMap = getNodesMap(nodes)
  return { type, nodesMap }
}

const parseCategory = function(perm, category) {
  const { type, nodes: catNodes } = parsePerm({
    perm,
    funcName: 'parseCategory',
    category,
  })
  const nodes = catNodes.map(catNode => ({ ...catNode, category }))
  const nodesMap = getNodesMap(nodes)
  const nodesMapA = omitBy(nodesMap, isInvalidNode)
  return { type, nodesMap: nodesMapA }
}

const parsePerm = function({ perm, funcName, category }) {
  const { type: typeA, nodes } = TYPES.reduce(
    (memo, type) => parseReduce({ memo, type, perm, funcName, category }),
    {},
  )

  validateNodes({ nodes, perm })

  return { type: typeA, nodes }
}

const parseReduce = function({ memo, type, perm, funcName, category }) {
  if (memo.nodes !== undefined) {
    return memo
  }

  const nodes = type[funcName](perm, category)
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

// Exclude special flags not valid for current category
const isInvalidNode = function(node, nodeKey) {
  return NODES_MAP[nodeKey] === undefined
}

module.exports = {
  parse,
  parseCategory,
}
