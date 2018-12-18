'use strict'

const assert = require('assert')

const TYPES = require('./types')

const parse = function(perm) {
  const type = getType({ perm })

  assert(type.name !== 'invalid', `Invalid permissions: ${perm}`)

  const tokens = type.parse(perm)
  return tokens
}

const getType = function({ perm }) {
  return TYPES.find(({ test }) => test(perm))
}

module.exports = {
  parse,
}
