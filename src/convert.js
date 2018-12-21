'use strict'

const { guessType, getTypeByName } = require('./type')
const TYPES = require('./types')

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
  const convertersA = TYPES.map(getConverter)
  return Object.assign({}, ...convertersA)
}

const getConverter = function({ name }) {
  const convertA = convert.bind(null, name)
  return { [name]: convertA }
}

const converters = getConverters()

module.exports = {
  convert,
  ...converters,
}
