import filterObj from 'filter-obj'
import isPlainObj from 'is-plain-obj'

import { getNodesMap, NODES_MAP } from './nodes.js'
import { TYPES } from './types/main.js'

// Parse permission to a `nodesMap`
// `nodesMap` uses an intermediary/internal format to facilitate conversions
// between types.
// Guesses permission type by trying each `type.parse()` in order, and using
// the first one that does not return `undefined`
export const parse = function (perm) {
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  const { type, nodes } = TYPES.reduce(parseReduce.bind(undefined, perm), {})

  validateNodes({ nodes, perm })

  const nodesMap = normalizeNodes({ nodes })

  return { type, nodesMap }
}

const parseReduce = function (perm, memo, type) {
  if (memo.nodes !== undefined) {
    return memo
  }

  const nodes = type.parse(perm)
  return { type, nodes }
}

// When we tried each type and none matched, we throw an error
const validateNodes = function ({ nodes, perm }) {
  if (nodes !== undefined) {
    return
  }

  const permA = isPlainObj(perm) ? JSON.stringify(perm) : perm
  throw new Error(`Permissions syntax is invalid: ${permA}`)
}

const normalizeNodes = function ({ nodes }) {
  const nodesMap = getNodesMap(nodes)
  const nodesMapA = filterObj(nodesMap, isValidNode)
  return nodesMapA
}

// Exclude special flags not valid for current category
const isValidNode = function (nodeKey) {
  return NODES_MAP[nodeKey] !== undefined
}
