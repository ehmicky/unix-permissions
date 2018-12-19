'use strict'

const { guessType, getTypeByName } = require('./type')

const convert = function(perm, typeName) {
  const tokens = parse(perm)
  const permA = serialize(tokens, typeName)
  return permA
}

const parse = function(perm) {
  const type = guessType(perm)
  const tokens = type.parse(perm)
  return tokens
}

const serialize = function(tokens, typeName) {
  const typeA = getTypeByName(typeName)
  const perm = typeA.serialize(tokens)
  return perm
}

module.exports = {
  convert,
}
