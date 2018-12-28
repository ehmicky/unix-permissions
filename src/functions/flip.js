'use strict'

const { unaryMap } = require('../helpers')
const { NODES_MAP } = require('../nodes')
const { mapValues } = require('../utils')

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
