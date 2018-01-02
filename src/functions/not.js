'use strict'

const { unaryMap } = require('../helpers')
const { mapValues } = require('../utils')

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are inverted.
const notMap = function(nodesMap) {
  return mapValues(nodesMap, notNode)
}

const notNode = function({ add, ...node }) {
  return { ...node, add: !add }
}

const not = unaryMap.bind(null, notMap)

module.exports = {
  not,
  notMap,
}
