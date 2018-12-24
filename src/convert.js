'use strict'

const assert = require('assert')

const { TYPES, TYPES_MAP } = require('./types')
const { mapValues, isPlainObject } = require('./utils')

const convert = function(typeName, perm) {
  const nodes = parse(perm)
  validateNodes({ nodes, perm })

  const permA = serialize(typeName, nodes)
  return permA
}

const validateNodes = function({ nodes, perm }) {
  if (nodes !== undefined) {
    return
  }

  const permA = isPlainObject(perm) ? JSON.stringify(perm) : perm
  throw new Error(`Permissions syntax is invalid: ${permA}`)
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

const serialize = function(typeName, nodes) {
  const type = TYPES_MAP[typeName]
  assert(type !== undefined, `Invalid type: ${typeName}`)

  const perm = type.serialize(nodes)
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
  ...converters,
}
