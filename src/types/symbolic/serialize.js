'use strict'

const { CATEGORY_PERMISSIONS, CATEGORIES, OPERATORS } = require('../../tokens')

// Input `tokens` must always be sorted
const serialize = function(tokens) {
  if (tokens.length === 0) {
    return DEFAULT_SERIALIZE
  }

  const perm = CATEGORIES.flatMap(category =>
    serializeGroup({ category, tokens }),
  )
    .flatMap(joinCategories)
    .map(finalizeGroup)
    .join(',')
  return perm
}

// Noop symbolic format.
// Empty string is possible as well on intput, but this is clearer in output.
const DEFAULT_SERIALIZE = 'a+'

const serializeGroup = function({ category, tokens }) {
  const tokensA = tokens.filter(token => token.category === category)

  if (tokensA.length === 0) {
    return []
  }

  if (shouldUseEqual({ category, tokens: tokensA })) {
    return serializeEqualGroup({ category, tokens: tokensA })
  }

  return serializeAddGroups({ category, tokens: tokensA })
}

const shouldUseEqual = function({ category, tokens }) {
  return CATEGORY_PERMISSIONS[category].every(permission =>
    containsPermission({ tokens, permission }),
  )
}

const containsPermission = function({ tokens, permission }) {
  return tokens.some(token => token.permission === permission)
}

const serializeEqualGroup = function({ category, tokens }) {
  const permissions = tokens.map(serializeEqualPerm).join('')
  return { category, operator: '=', permissions }
}

const serializeEqualPerm = function({ add, permission }) {
  if (!add) {
    return ''
  }

  return permission
}

const serializeAddGroups = function({ category, tokens }) {
  return Object.keys(OPERATORS)
    .map(add => seralizeAddGroup({ category, tokens, add }))
    .filter(Boolean)
}

const seralizeAddGroup = function({ category, tokens, add }) {
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

const finalizeGroup = function({ category, operator, permissions }) {
  return `${category}${operator}${permissions}`
}

module.exports = {
  serialize,
}
