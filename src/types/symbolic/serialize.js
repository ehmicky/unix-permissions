'use strict'

const { CATEGORY_PERMISSIONS, CATEGORIES, ADDS } = require('../../values')

const serialize = function(tokens) {
  // eslint-disable-next-line fp/no-mutating-methods
  const tokensA = tokens.sort(compareTokens)
  const perm = CATEGORIES.flatMap(category =>
    serializeGroup({ category, tokens: tokensA }),
  )
    .flatMap(joinCategories)
    .map(finalizeGroup)
    .join(',')
  return perm
}

const compareTokens = function(tokenA, tokenB) {
  if (tokenA.order > tokenB.order) {
    return 1
  }

  if (tokenA.order < tokenB.order) {
    return -1
  }

  return 0
}

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
  return Object.keys(ADDS)
    .map(add => seralizeAddGroup({ category, tokens, add }))
    .filter(Boolean)
}

const seralizeAddGroup = function({ category, tokens, add }) {
  const tokensA = tokens.filter(token => String(token.add) === add)

  if (tokensA.length === 0) {
    return ''
  }

  const permissions = tokensA.map(({ permission }) => permission).join('')
  return { category, operator: ADDS[add], permissions }
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
