'use strict'

const assert = require('assert')

const TYPES = require('./types')
const { keyBy } = require('./utils')

const guessType = function(perm) {
  const type = getTypeByPerm(perm)
  assert(type !== undefined, `Invalid permissions: ${perm}`)
  return type
}

const getTypeByPerm = function(perm) {
  return TYPES.find(({ test }) => test(perm))
}

const getTypeByName = function(typeName) {
  const type = TYPES_MAP[typeName]
  assert(type !== undefined, `Invalid type: ${typeName}`)
  return type
}

const TYPES_MAP = keyBy(TYPES, 'name')

module.exports = {
  guessType,
  getTypeByPerm,
  getTypeByName,
}
