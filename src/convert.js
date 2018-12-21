'use strict'

const { guessType, getTypeByName, TYPES_MAP } = require('./type')
const { mapValues } = require('./utils')

const convert = function(typeName, perm) {
  const tokens = parse(perm)
  const permA = serialize(typeName, tokens)
  return permA
}

const parse = function(perm) {
  const type = guessType(perm)
  const tokens = type.parse(perm)
  return tokens
}

const serialize = function(typeName, tokens) {
  const typeA = getTypeByName(typeName)
  const perm = typeA.serialize(tokens)
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
