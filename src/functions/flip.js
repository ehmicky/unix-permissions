'use strict'

const { unaryMap } = require('../helpers')
const { NODES_MAP } = require('../nodes')
const { omitBy, mapValues } = require('../utils')

const flipMap = function(nodesMap) {
  const flippedMap = omitBy(
    NODES_MAP,
    (node, nodeKey) => nodesMap[nodeKey] !== undefined,
  )
  const flippedMapA = mapValues(flippedMap, addAdd)
  return flippedMapA
}

const addAdd = function(node) {
  return { ...node, add: true }
}

const flip = unaryMap.bind(null, flipMap)

module.exports = {
  flip,
  flipMap,
}
