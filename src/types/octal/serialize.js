'use strict'

const number = require('../number')

const {
  OCTAL_BASE,
  SERIALIZE_LENGTH,
  SERIALIZE_PAD,
  OPERATORS: { MINUS, EQUAL, NONE },
} = require('./constants')

const serialize = function(nodes) {
  const operator = serializeOperator({ nodes })
  const string = serializeInteger({ operator, nodes })
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

const serializeInteger = function({ operator, nodes }) {
  const integer =
    operator === MINUS ? number.serializeNodes(nodes) : number.serialize(nodes)
  const string = integer
    .toString(OCTAL_BASE)
    .padStart(SERIALIZE_LENGTH, SERIALIZE_PAD)
  return string
}

module.exports = {
  serialize,
}
