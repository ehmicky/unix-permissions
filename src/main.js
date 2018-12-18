'use strict'

const assert = require('assert')

const TYPES = require('./types')

const getType = function(perm) {
  return TYPES.find(({ test }) => test(perm))
}

const isValid = function(perm) {
  return getType(perm) !== 'invalid'
}

const parse = function(perm) {
  const type = getType(perm)

  assert(type.name !== 'invalid', `Invalid permissions: ${perm}`)

  const tokens = type.parse(perm)
  return tokens
}

module.exports = {
  getType,
  isValid,
  parse,
}
