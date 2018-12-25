'use strict'

const { binaryMap } = require('../helpers')
const { mapValues } = require('../utils')

const unsetMap = function(nodesMap, nodesMapA) {
  const nodesMapB = mapValues(nodesMapA, invertAdd)
  return { ...nodesMap, ...nodesMapB }
}

const invertAdd = function({ add, ...node }) {
  return { ...node, add: !add }
}

const unset = binaryMap.bind(null, unsetMap)

module.exports = {
  unset,
}
