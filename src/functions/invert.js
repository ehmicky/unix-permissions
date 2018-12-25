'use strict'

const { unaryMap } = require('../helpers')
const { getNodesMap } = require('../nodes')
const { NODES, SPECIAL_PERMISSIONS } = require('../constants')

const { flipMap } = require('./flip')

const invertMap = function(nodesMap) {
  const nodesMapA = flipMap(nodesMap)
  return { ...nodesMapA, ...REMOVE_FLAGS_MAP }
}

const invert = unaryMap.bind(null, invertMap)

const getRemoveFlagsMap = function() {
  const nodes = NODES.filter(isSpecial).map(addAddFalse)
  return getNodesMap(nodes)
}

const isSpecial = function({ permission }) {
  return SPECIAL_PERMISSIONS.includes(permission)
}

const addAddFalse = function(node) {
  return { ...node, add: false }
}

const REMOVE_FLAGS_MAP = getRemoveFlagsMap()

module.exports = {
  invert,
}
