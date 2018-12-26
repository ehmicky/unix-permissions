'use strict'

const { variableMap } = require('../helpers')
const { mapValues, omitBy } = require('../utils')

const minMaxMap = function(values, nodesMap, nodesMapA) {
  const mergedNodes = { ...nodesMap, ...nodesMapA }
  const nodesMapB = mapValues(mergedNodes, (node, nodeKey) =>
    findNode({ values, nodesMap, nodesMapA, nodeKey }),
  )
  const nodesMapC = omitBy(nodesMapB, (nodeKey, node) => node === undefined)
  return nodesMapC
}

const findNode = function({ values, nodesMap, nodesMapA, nodeKey }) {
  const [nodeB] = values
    .flatMap(value => [[nodesMap[nodeKey], value], [nodesMapA[nodeKey], value]])
    .find(hasValue)
  return nodeB
}

const hasValue = function([{ add } = {}, value]) {
  return add === value
}

const MIN_VALUES = [false, undefined, true]
const minMap = minMaxMap.bind(null, MIN_VALUES)
const min = variableMap.bind(null, minMap)

const MAX_VALUES = [true, undefined, false]
const maxMap = minMaxMap.bind(null, MAX_VALUES)
const max = variableMap.bind(null, maxMap)

module.exports = {
  min,
  max,
}
