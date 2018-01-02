'use strict'

const { NODES_MAP, CAT_NODES_MAP } = require('../../nodes')
const number = require('../number')

const {
  OCTAL_BASE,
  SERIALIZE_LENGTH,
  CAT_SERIALIZE_LENGTH,
  SERIALIZE_PAD,
  OPERATORS: { PLUS, MINUS, NONE },
} = require('./constants')

// Serialize from `nodes` to a `octal` permission
const serializePerm = function({ funcName, padLength, nodesLength }, nodes) {
  const operator = serializeOperator({ nodes, nodesLength })
  const string = serializeInteger({ operator, nodes, funcName, padLength })
  const octal = `${operator}${string}`
  return octal
}

// `octal` can be prefixed with `-` or `+` if partial and only negative|positive
// `=` is the default operator, i.e. is never serialized.
const serializeOperator = function({ nodes, nodesLength }) {
  if (!isPartial({ nodes, nodesLength })) {
    return NONE
  }

  if (nodes.every(isAdded)) {
    return PLUS
  }

  if (nodes.every(isRemoved)) {
    return MINUS
  }

  return NONE
}

const isPartial = function({ nodes, nodesLength }) {
  return Object.keys(nodes).length !== nodesLength
}

const isAdded = function({ add }) {
  return add === true
}

const isRemoved = function({ add }) {
  return add === false
}

// Re-use `number` serialization logic, then stringify to an octal number
const serializeInteger = function({ operator, nodes, funcName, padLength }) {
  const nodesA = serializeMinus({ operator, nodes })
  const integer = number[funcName](nodesA)
  // Always serialize to 4 characters (with leading 0s)
  const string = integer.toString(OCTAL_BASE).padStart(padLength, SERIALIZE_PAD)
  return string
}

// When using `-octal`, we need the inverse number
const serializeMinus = function({ operator, nodes }) {
  if (operator !== MINUS) {
    return nodes
  }

  return nodes.map(node => ({ ...node, add: true }))
}

// `serializeCategory()` uses same logic but with other numberical values
const serialize = serializePerm.bind(null, {
  funcName: 'serialize',
  padLength: SERIALIZE_LENGTH,
  nodesLength: Object.keys(NODES_MAP).length,
})
const serializeCategory = serializePerm.bind(null, {
  funcName: 'serializeCategory',
  padLength: CAT_SERIALIZE_LENGTH,
  // `- 1` because `nodesMap` includes both `s` and `t`
  nodesLength: Object.keys(CAT_NODES_MAP).length - 1,
})

module.exports = {
  serialize,
  serializeCategory,
}
