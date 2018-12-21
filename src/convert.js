'use strict'

const assert = require('assert')

const { TYPES, TYPES_MAP } = require('./types')
const { mapValues } = require('./utils')

const convert = function(typeName, perm) {
  const tokens = parse(perm)
  assert(tokens !== undefined, `Permissions syntax is invalid: ${perm}`)

  const permA = serialize(typeName, tokens)
  return permA
}

const parse = function(perm) {
  return TYPES.reduce((memo, type) => parseReduce(memo, type, perm), undefined)
}

const parseReduce = function(memo, type, perm) {
  if (memo !== undefined) {
    return memo
  }

  return type.parse(perm)
}

const serialize = function(typeName, tokens) {
  const type = TYPES_MAP[typeName]
  assert(type !== undefined, `Invalid type: ${typeName}`)

  const perm = type.serialize(tokens)
  return perm
}

const getConverters = function() {
  return mapValues(TYPES_MAP, getConverter)
}

const getConverter = function({ name }) {
  return convert.bind(null, name)
}

const converters = getConverters()

module.exports = {
  convert,
  ...converters,
}
