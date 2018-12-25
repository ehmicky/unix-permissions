'use strict'

const { TYPES } = require('./types')
const { isPlainObject } = require('./utils')
const { getNodesMap } = require('./nodes')

const parse = function(perm) {
  const { type, nodes } = TYPES.reduce(
    (memo, typeA) => parseReduce(memo, typeA, perm),
    {},
  )

  validateNodes({ nodes, perm })

  const nodesMap = getNodesMap(nodes)

  return { type, nodesMap }
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

module.exports = {
  parse,
}
