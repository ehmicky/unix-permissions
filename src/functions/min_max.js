import { excludeKeys } from 'filter-obj'

import { variableMap } from '../helpers.js'
import { mapValues } from '../utils.js'

// Returns the minimum|maximum permissions among two permissions.
// This is done permission bit by permission bit.
const minMaxMap = function (values, nodesMap, nodesMapA) {
  const mergedNodes = { ...nodesMap, ...nodesMapA }
  const nodesMapB = mapValues(mergedNodes, (node, nodeKey) =>
    findNode({ values, nodesMap, nodesMapA, nodeKey }),
  )
  // `undefined` nodes might be present if they got picked because of being
  // higher|lower than `+` or `-`
  const nodesMapC = excludeKeys(nodesMapB, isUndefined)
  return nodesMapC
}

// Omitted permissions depend on the permission they will be applied to, i.e.
// can be either `+` or `-`. In that case, they stand between `+` and `-`
// in comparison order.
// We iterate over both nodes and the possible values from highest to lowest
// until finding the right node.
const findNode = function ({ values, nodesMap, nodesMapA, nodeKey }) {
  const [nodeB] = values
    .flatMap((value) => [
      [nodesMap[nodeKey], value],
      [nodesMapA[nodeKey], value],
    ])
    .find(hasValue)
  return nodeB
}

const hasValue = function ([{ add } = {}, value]) {
  return add === value
}

const isUndefined = function (key, value) {
  return value === undefined
}

const MIN_VALUES = [false, undefined, true]
const minMap = minMaxMap.bind(undefined, MIN_VALUES)
export const min = variableMap.bind(undefined, minMap)

const MAX_VALUES = [true, undefined, false]
const maxMap = minMaxMap.bind(undefined, MAX_VALUES)
export const max = variableMap.bind(undefined, maxMap)
