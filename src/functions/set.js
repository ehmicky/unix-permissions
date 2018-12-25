'use strict'

const { binaryMap } = require('../helpers')
const { getNodesMap, getNodeKey } = require('../nodes')

const setMap = function(nodes, nodesA) {
  const nodesMap = getNodesMap(nodes)
  const nodesMapA = nodesA.reduce(setMapReduce, nodesMap)
  return Object.values(nodesMapA)
}

const setMapReduce = function(nodesMap, node) {
  const nodeKey = getNodeKey(node)

  const { category, permission } = nodesMap[nodeKey] || node
  const { add } = node
  const nodeA = { category, permission, add }

  return { ...nodesMap, [nodeKey]: nodeA }
}

const set = binaryMap.bind(null, setMap)

module.exports = {
  set,
}
