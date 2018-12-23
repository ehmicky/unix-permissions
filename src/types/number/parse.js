'use strict'

const { NODES } = require('../../constants')

const { MIN_NUMBER, MAX_NUMBER } = require('./constants')

const name = 'number'

const parse = function(number) {
  if (!isValidNumber(number)) {
    return
  }

  return NODES.filter(node => hasNode({ number, node })).map(addAdd)
}

// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
const isValidNumber = function(number) {
  return (
    Number.isInteger(number) && number >= MIN_NUMBER && number <= MAX_NUMBER
  )
}

const hasNode = function({ number, node: { value } }) {
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}

// We cannot know if unset bits mean `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const addAdd = function({ category, permission }) {
  return { category, permission, add: true }
}

module.exports = {
  name,
  parse,
}
