'use strict'

const { NODES_MAP, CAT_NODES_MAP } = require('../../nodes')

const {
  VALUES,
  MIN_NUMBER,
  MAX_NUMBER,
  CAT_VALUES,
  CAT_MAX_NUMBER,
} = require('./constants')

const parseNumber = function({ nodesMap, max, values }, number) {
  if (!isValidNumber({ number, max })) {
    return
  }

  return Object.entries(nodesMap)
    .filter(([nodeKey]) => hasNode({ number, nodeKey, values }))
    .map(addAdd)
}

// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
const isValidNumber = function({ number, max }) {
  return Number.isInteger(number) && number >= MIN_NUMBER && number <= max
}

const hasNode = function({ number, nodeKey, values }) {
  const value = values[nodeKey]
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}

// We cannot know if unset bits mean `add: false` (must unset bits) or
// `add: undefined` (leave bits as is), so we assume the later.
const addAdd = function([, node]) {
  return { ...node, add: true }
}

const parse = parseNumber.bind(null, {
  nodesMap: NODES_MAP,
  max: MAX_NUMBER,
  values: VALUES,
})
const parseCategory = parseNumber.bind(null, {
  nodesMap: CAT_NODES_MAP,
  max: CAT_MAX_NUMBER,
  values: CAT_VALUES,
})

module.exports = {
  parse,
  parseCategory,
}
