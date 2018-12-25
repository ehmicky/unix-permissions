'use strict'

const { binaryMap } = require('../helpers')

const setMap = function(nodesMap, nodesMapA) {
  return { ...nodesMap, ...nodesMapA }
}

const set = binaryMap.bind(null, setMap)

module.exports = {
  set,
}
