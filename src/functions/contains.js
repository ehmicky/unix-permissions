'use strict'

const { binaryTest } = require('../helpers')

const { fullMap } = require('./full')

const containsTest = function(nodesMapA, nodesMapB) {
  // The first argument is set to its full shape.
  // The reason is:
  //  - using `add: false` in nodesMapB must mean:
  //     - `add === undefined` if `nodesMapA` is a `stat` or `number`
  //     - either `add === false` or `add === undefined` if `nodesMapA` is a
  //       `symbolic` or `object`
  //  - we force the `add === false|undefined` meaning by using `fullMap()`
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
