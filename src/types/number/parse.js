'use strict'

const { NODES, CAT_NODES } = require('../../constants')

const { MIN_NUMBER, MAX_NUMBER, MAX_CAT_NUMBER } = require('./constants')

const name = 'number'

const parseNumber = function(nodes, max, number) {
  if (!isValidNumber({ number, max })) {
    return
  }

  return nodes.filter(node => hasNode({ number, node })).map(addAdd)
}

// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
const isValidNumber = function({ number, max }) {
  return Number.isInteger(number) && number >= MIN_NUMBER && number <= max
}

const hasNode = function({ number, node: { value } }) {
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}

// We cannot know if unset bits mean `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const addAdd = function(node) {
  return { ...node, add: true }
}

const parse = parseNumber.bind(null, NODES, MAX_NUMBER)
const parseCategory = parseNumber.bind(null, CAT_NODES, MAX_CAT_NUMBER)

module.exports = {
  name,
  parse,
  parseCategory,
}
