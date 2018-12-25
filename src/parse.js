'use strict'

const assert = require('assert')

const { TYPES, TYPES_MAP } = require('./types')
const { isPlainObject } = require('./utils')
const { getNode } = require('./nodes')

const parse = function(perm) {
  const { type, nodes } = TYPES.reduce(
    (memo, typeA) => parseReduce(memo, typeA, perm),
    {},
  )

  validateNodes({ nodes, perm })

  return { type, nodes }
}

const parseReduce = function(memo, type, perm) {
  if (memo.nodes !== undefined) {
    return memo
  }

  const nodes = type.parse(perm)
  return { type, nodes }
}

const validateNodes = function({ nodes, perm }) {
  if (nodes !== undefined) {
    return
  }

  const permA = isPlainObject(perm) ? JSON.stringify(perm) : perm
  throw new Error(`Permissions syntax is invalid: ${permA}`)
}

const serialize = function(typeName, nodes) {
  const type = TYPES_MAP[typeName]
  assert(type !== undefined, `Invalid type: ${typeName}`)

  const nodesA = sortNodes(nodes)
  const perm = type.serialize(nodesA)
  return perm
}

// Ensure nodes have a stable order before serializing
const sortNodes = function(nodes) {
  // eslint-disable-next-line fp/no-mutating-methods
  return nodes.sort(compareNodes)
}

const compareNodes = function(nodeA, nodeB) {
  const { order: orderA } = getNode(nodeA)
  const { order: orderB } = getNode(nodeB)

  if (orderA > orderB) {
    return 1
  }

  if (orderA < orderB) {
    return -1
  }

  return 0
}

module.exports = {
  parse,
  serialize,
}
