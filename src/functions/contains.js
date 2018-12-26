'use strict'

const { binaryTest } = require('../helpers')

const { fullMap } = require('./full')

const containsTest = function(nodesMapA, nodesMapB) {
  const nodesMapC = fullMap(nodesMapA)

  return Object.entries(nodesMapB).every(([nodeKey, node]) =>
    containsNode({ nodesMap: nodesMapC, nodeKey, node }),
  )
}

const containsNode = function({ nodesMap, nodeKey, node }) {
  return node.add === nodesMap[nodeKey].add
}

const contains = binaryTest.bind(null, containsTest)

module.exports = {
  contains,
}
