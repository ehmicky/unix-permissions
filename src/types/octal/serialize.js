'use strict'

const number = require('../number')

const {
  OCTAL_BASE,
  SERIALIZE_LENGTH,
  CAT_SERIALIZE_LENGTH,
  SERIALIZE_PAD,
  OPERATORS: { MINUS, EQUAL, NONE },
} = require('./constants')

// Serialize from `nodes` to a `octal` permission
const serializePerm = function({ funcName, padLength }, nodes) {
  const operator = serializeOperator({ nodes })
  const string = serializeInteger({ operator, nodes, funcName, padLength })
  const octal = `${operator}${string}`
  return octal
}

// `octal` can be prefixed with `-` or `=`.
// `+` is the default operator, i.e. is never serialized.
const serializeOperator = function({ nodes }) {
  // Including empty array
  if (!nodes.some(isRemoved)) {
    return NONE
  }

  if (nodes.every(isRemoved)) {
    return MINUS
  }

  return EQUAL
}

const isRemoved = function({ add }) {
  return add !== true
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
})
const serializeCategory = serializePerm.bind(null, {
  funcName: 'serializeCategory',
  padLength: CAT_SERIALIZE_LENGTH,
})

module.exports = {
  serialize,
  serializeCategory,
}
