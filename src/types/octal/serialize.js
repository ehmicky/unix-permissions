'use strict'

const number = require('../number')

const {
  OCTAL_BASE,
  SERIALIZE_LENGTH,
  CAT_SERIALIZE_LENGTH,
  SERIALIZE_PAD,
  OPERATORS: { MINUS, EQUAL, NONE },
} = require('./constants')

const serializePerm = function({ funcName, padLength }, nodes) {
  const operator = serializeOperator({ nodes })
  const string = serializeInteger({ operator, nodes, funcName, padLength })
  const octal = `${operator}${string}`
  return octal
}

const serializeOperator = function({ nodes }) {
  if (nodes.length === 0) {
    return NONE
  }

  const isMinus = nodes.every(isRemoved)

  if (isMinus) {
    return MINUS
  }

  const isEqual = nodes.some(isRemoved)

  if (isEqual) {
    return EQUAL
  }

  return NONE
}

const isRemoved = function({ add }) {
  return !add
}

const serializeInteger = function({ operator, nodes, funcName, padLength }) {
  const nodesA = serializeMinus({ operator, nodes })
  const integer = number[funcName](nodesA)
  const string = integer.toString(OCTAL_BASE).padStart(padLength, SERIALIZE_PAD)
  return string
}

const serializeMinus = function({ operator, nodes }) {
  if (operator !== MINUS) {
    return nodes
  }

  return nodes.map(node => ({ ...node, add: true }))
}

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
