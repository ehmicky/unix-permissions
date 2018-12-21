'use strict'

const { NODES, getNode } = require('../nodes')

const name = 'number'

const parse = function(number) {
  if (!isValidNumber(number)) {
    return
  }

  return NODES.filter(node => hasNode({ number, node })).map(addAdd)
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

const hasNode = function({ number, node: { value } }) {
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}

// We cannot know if unset bits mean `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const addAdd = function({ category, permission }) {
  return { category, permission, add: true }
}

const serialize = function(nodes) {
  return nodes
    .filter(hasAdd)
    .map(getValue)
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add
}

const getValue = function({ category, permission }) {
  const { value } = getNode({ category, permission })
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
