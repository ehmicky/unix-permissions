'use strict'

const { unaryMap } = require('../helpers')

const normalizeMap = function(nodesMap) {
  return nodesMap
}

const normalize = unaryMap.bind(null, normalizeMap)

module.exports = {
  normalize,
}
