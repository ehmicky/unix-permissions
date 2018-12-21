'use strict'

const number = require('../number')

const serialize = function(nodes) {
  const operator = serializeOperator({ nodes })
  const string = serializeInteger({ operator, nodes })
  const octal = `${operator}${string}`
  return octal
}

const serializeOperator = function({ nodes }) {
  if (nodes.length === 0) {
    return ''
  }

  const isMinus = nodes.every(isRemoved)

  if (isMinus) {
    return '-'
  }

  const isEqual = nodes.some(isRemoved)

  if (isEqual) {
    return '='
  }

  return ''
}

const isRemoved = function({ add }) {
  return !add
}

const serializeInteger = function({ operator, nodes }) {
  const integer =
    operator === '-' ? number.serializeNodes(nodes) : number.serialize(nodes)
  const string = integer.toString(OCTAL_BASE).padStart(SERIALIZE_LENGTH, '0')
  return string
}

const OCTAL_BASE = 8
const SERIALIZE_LENGTH = 4

module.exports = {
  serialize,
}
