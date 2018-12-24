'use strict'

const assert = require('assert')

const { TYPES, TYPES_MAP } = require('./types')
const { isPlainObject } = require('./utils')

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

  const perm = type.serialize(nodes)
  return perm
}

module.exports = {
  parse,
  serialize,
}
