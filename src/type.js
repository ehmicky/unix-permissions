'use strict'

const { TYPES_MAP } = require('./types')

const type = function(perm) {
  const typeA = Object.entries(TYPES_MAP).find(
    ([, { parse }]) => parse(perm) !== undefined,
  )
  return typeA === undefined ? UNKNOWN_TYPE : typeA[0]
}

const UNKNOWN_TYPE = 'unknown'

module.exports = {
  type,
}
