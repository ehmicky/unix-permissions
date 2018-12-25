'use strict'

const { unaryMap } = require('../helpers')
const { EMPTY_NODES_MAP } = require('../nodes')

const fullMap = function(nodesMap) {
  return { ...EMPTY_NODES_MAP, ...nodesMap }
}

const full = unaryMap.bind(null, fullMap)

module.exports = {
  full,
}
