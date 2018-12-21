'use strict'

const { CATEGORY_PERMISSIONS, CATEGORIES, OPERATORS } = require('../../tokens')

// Input `tokens` must always be sorted
const serialize = function(tokens) {
  if (tokens.length === 0) {
    return DEFAULT_SERIALIZE
  }

  const perm = CATEGORIES.flatMap(category =>
    serializePart({ category, tokens }),
  )
    .flatMap(joinCategories)
    .map(finalizePart)
    .join(',')
  return perm
}

// Noop symbolic format.
// Empty string is possible as well on intput, but this is clearer in output.
const DEFAULT_SERIALIZE = 'a+'

const serializePart = function({ category, tokens }) {
  const tokensA = tokens.filter(token => token.category === category)

  if (tokensA.length === 0) {
    return []
  }

  if (shouldUseEqual({ category, tokens: tokensA })) {
    return serializeEqualPart({ category, tokens: tokensA })
  }

  return serializeAddParts({ category, tokens: tokensA })
}

const shouldUseEqual = function({ category, tokens }) {
  return CATEGORY_PERMISSIONS[category].every(permission =>
    containsPermission({ tokens, permission }),
  )
}

const containsPermission = function({ tokens, permission }) {
  return tokens.some(token => token.permission === permission)
}

const serializeEqualPart = function({ category, tokens }) {
  const permissions = tokens.map(serializeEqualPerm).join('')
  return { category, operator: '=', permissions }
}

const serializeEqualPerm = function({ add, permission }) {
  if (!add) {
    return ''
  }

  return permission
}

const serializeAddParts = function({ category, tokens }) {
  return Object.keys(OPERATORS)
    .map(add => seralizeAddPart({ category, tokens, add }))
    .filter(Boolean)
}

const seralizeAddPart = function({ category, tokens, add }) {
  const tokensA = tokens.filter(token => String(token.add) === add)

  if (tokensA.length === 0) {
    return ''
  }

  const permissions = tokensA.map(({ permission }) => permission).join('')
  return { category, operator: OPERATORS[add], permissions }
}

const joinCategories = function(token, index, tokens) {
  const sameTokens = tokens.filter(tokenA => canJoinTokens(token, tokenA))

  if (sameTokens.length === 1) {
    return token
  }

  const categories = sameTokens.map(tokenA => tokenA.category)

  if (categories[0] !== token.category) {
    return []
  }

  if (categories.length === CATEGORIES.length) {
    return { ...token, category: 'a' }
  }

  return { ...token, category: categories.join('') }
}

const canJoinTokens = function(tokenA, tokenB) {
  return (
    tokenA.operator === tokenB.operator &&
    tokenA.permissions === tokenB.permissions
  )
}

const finalizePart = function({ category, operator, permissions }) {
  return `${category}${operator}${permissions}`
}

module.exports = {
  serialize,
}
