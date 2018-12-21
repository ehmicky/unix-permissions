'use strict'

const { TOKENS, TOKENS_MAP } = require('../nodes')

const name = 'number'

const parse = function(number) {
  if (!isValidNumber(number)) {
    return
  }

  return TOKENS.filter(token => hasToken({ number, token })).map(addAdd)
}

const isValidNumber = function(number) {
  return (
    Number.isInteger(number) && number >= MIN_NUMBER && number <= MAX_NUMBER
  )
}

const MIN_NUMBER = 0
// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
// eslint-disable-next-line no-magic-numbers
const MAX_NUMBER = 2 ** 16 - 1

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
  return tokens
    .filter(hasAdd)
    .map(getValue)
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add
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
  parse,
  serialize,
}
