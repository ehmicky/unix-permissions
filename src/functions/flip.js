'use strict'

const { unaryMap } = require('../helpers')
const { NODES_MAP } = require('../nodes')
const { mapValues } = require('../utils')

// Invert a permission's `+` and `-`, including special flags
// Missing permissions are inverted to `+`, i.e. this is as if `full()` had
// been applied.
const flipMap = function(nodesMap) {
  return mapValues(NODES_MAP, (node, nodeKey) =>
    flipAdd({ nodesMap, node, nodeKey }),
  )
}

const flipAdd = function({ nodesMap, node, nodeKey }) {
  const { add } = nodesMap[nodeKey] || {}
  return { ...node, add: !add }
}

const flip = unaryMap.bind(null, flipMap)

module.exports = {
  flip,
  flipMap,
}
