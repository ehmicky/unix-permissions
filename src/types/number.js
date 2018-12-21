'use strict'

const { TOKENS, TOKENS_MAP } = require('../tokens')

const name = 'number'

const test = function(perm) {
  return Number.isInteger(perm) && perm >= MIN_NUMBER && perm <= MAX_NUMBER
}

const MIN_NUMBER = 0
// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
// eslint-disable-next-line no-magic-numbers
const MAX_NUMBER = 2 ** 16 - 1

const parse = function(number) {
  return TOKENS.filter(token => hasToken({ number, token })).map(addAdd)
}

const hasToken = function({ number, token: { value } }) {
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}

// We cannot know if unset bits mean `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const addAdd = function({ category, permission }) {
  return { category, permission, add: true }
}

const serialize = function(tokens) {
  return tokens.map(getValue).reduce(sum, 0)
}

const getValue = function({ category, permission }) {
  const { value } = TOKENS_MAP[`${category} ${permission}`]
  return value
}

const sum = function(memo, number) {
  return memo + number
}

module.exports = {
  name,
  test,
  parse,
  serialize,
}
