'use strict'

const { unaryMap } = require('../helpers')
const { getNodesMap, NODES_MAP } = require('../nodes')

const fullMap = function(nodes) {
  const nodesMap = getNodesMap(nodes)
  return Object.entries(NODES_MAP).map(([nodeKey, node]) =>
    fullNode({ nodeKey, node, nodesMap }),
  )
}

const fullNode = function({
  nodeKey,
  node: { category, permission },
  nodesMap,
}) {
  const node = nodesMap[nodeKey]

  if (node !== undefined) {
    return node
  }

  return { category, permission, add: false }
}

const full = unaryMap.bind(null, fullMap)

module.exports = {
  full,
}
