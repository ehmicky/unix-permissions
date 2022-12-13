import { NODES_MAP } from '../../nodes.js'

import { VALUES } from './constants.js'

// Parse a `number` permission to `nodes`
export const parse = (number) => {
  if (!isValidNumber({ number })) {
    return
  }

  return Object.entries(NODES_MAP).map(([nodeKey, node]) =>
    getNode({ number, nodeKey, node }),
  )
}

// We allow `stat` bitfields as input but ignore the bits related to file
// types. See `man inode (7)` for information on those file types.
const isValidNumber = ({ number }) =>
  Number.isInteger(number) && number >= MIN_NUMBER && number <= MAX_NUMBER

const MIN_NUMBER = 0
const MAX_NUMBER = 65_535

// Check permissions bit by bit
const getNode = ({ number, nodeKey, node }) => {
  const add = getAdd({ number, nodeKey })
  return { ...node, add }
}

const getAdd = ({ number, nodeKey }) => {
  const value = VALUES[nodeKey]
  // eslint-disable-next-line no-bitwise
  return (number & value) !== 0
}
