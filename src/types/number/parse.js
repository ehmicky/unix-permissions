import { NODES_MAP } from '../../nodes.js'

import { VALUES, MIN_NUMBER, MAX_NUMBER } from './constants'

// Parse a `number` permission to `nodes`
export const parse = function(number) {
  if (!isValidNumber({ number })) {
    return
  }

  return Object.entries(NODES_MAP).map(([nodeKey, node]) =>
    getNode({ number, nodeKey, node }),
  )
}

// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
const isValidNumber = function({ number }) {
  return (
    Number.isInteger(number) && number >= MIN_NUMBER && number <= MAX_NUMBER
  )
}

// Check permissions bit by bit
const getNode = function({ number, nodeKey, node }) {
  const add = getAdd({ number, nodeKey })
  return { ...node, add }
}

const getAdd = function({ number, nodeKey }) {
  const value = VALUES[nodeKey]
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}
