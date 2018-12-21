'use strict'

const {
  NODES,
  getNodeKey,
  CATEGORIES,
  SPECIAL_PERMISSIONS,
} = require('../nodes')

const name = 'stat'

const parse = function(stat) {
  const tokens = tokenize(stat)

  if (tokens === undefined || hasDuplicates({ tokens })) {
    return
  }

  const nodes = CATEGORIES.map(category => getCategory({ category, tokens }))
    .flatMap(addPermissions)
    .map(addAdd)
  return nodes
}

const tokenize = function(stat) {
  if (typeof stat !== 'string') {
    return
  }

  const tokens = STAT_REGEXP.exec(stat)

  if (tokens === null) {
    return
  }

  const [u, g, o] = tokens
    .slice(1)
    .map(removeDashes)
    .map(expandSpecial)
  // eslint-disable-next-line id-length
  return { u, g, o }
}

const STAT_REGEXP = /^[-dlpscbD]?([-rwxXsS]{3})([-rwxXsS]{3})([-rwxXtT]{3})$/u

// We cannot know if `-` means `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const removeDashes = function(part) {
  return part.replace(DASH_REGEXP, '')
}

const DASH_REGEXP = /-/gu

const expandSpecial = function(part) {
  return part
    .replace(X_REGEXP, 'x')
    .replace(SMALL_S_REGEXP, 'xs')
    .replace(BIG_S_REGEXP, 's')
    .replace(SMALL_T_REGEXP, 'xt')
    .replace(BIG_T_REGEXP, 't')
}

const X_REGEXP = /X/gu
const BIG_S_REGEXP = /S/gu
const SMALL_S_REGEXP = /s/gu
const BIG_T_REGEXP = /T/gu
const SMALL_T_REGEXP = /t/gu

const contractSpecial = function(part) {
  return part
    .replace(T_REGEXP, 'T')
    .replace(XT_REGEXP, 't')
    .replace(S_REGEXP, 'S')
    .replace(XS_REGEXP, 's')
}

const T_REGEXP = /-t/gu
const XT_REGEXP = /xt/gu
const S_REGEXP = /-s/gu
const XS_REGEXP = /xs/gu

const hasDuplicates = function({ tokens }) {
  return Object.values(tokens).some(hasDuplicate)
}

const hasDuplicate = function(string) {
  return string.split('').some(isDuplicate)
}

const isDuplicate = function(char, index, chars) {
  return chars.slice(index + 1).some(charB => char === charB)
}

const getCategory = function({ category, tokens }) {
  return { category, tokens: tokens[category] }
}

const addPermissions = function({ category, tokens }) {
  return tokens.split('').map(permission => ({ category, permission }))
}

const addAdd = function({ category, permission }) {
  return { category, permission, add: true }
}

const serialize = function(nodes) {
  const addedNodes = getAddedNodes({ nodes })

  const stat = NODES.map(node => serializeNode({ node, addedNodes })).join('')
  const statA = contractSpecial(stat)
  return statA
}

const getAddedNodes = function({ nodes }) {
  return nodes.filter(hasAdd).map(getNodeKey)
}

const hasAdd = function({ add }) {
  return add
}

const serializeNode = function({ node, node: { permission }, addedNodes }) {
  const nodeKey = getNodeKey(node)
  const added = addedNodes.includes(nodeKey)

  if (added) {
    return permission
  }

  if (SPECIAL_PERMISSIONS.includes(permission)) {
    return ''
  }

  return '-'
}

module.exports = {
  name,
  parse,
  serialize,
}
