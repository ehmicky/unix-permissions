import { TYPES_MAP } from './types.js'

// Retrieve the type of a permission, or returns `invalid`
const type = function(perm) {
  const typeA = Object.entries(TYPES_MAP).find(
    ([, { parse }]) => parse(perm) !== undefined,
  )
  return typeA === undefined ? INVALID_TYPE : typeA[0]
}

const INVALID_TYPE = 'invalid'

module.exports = {
  type,
}
