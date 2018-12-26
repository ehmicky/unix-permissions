'use strict'

const { unaryMap } = require('../helpers')
const { mapValues } = require('../utils')
const { SPECIAL_PERMISSIONS } = require('../constants')

const { flipMap } = require('./flip')

const invertMap = function(nodesMap) {
  const nodesMapA = flipMap(nodesMap)
  const nodesMapB = mapValues(nodesMapA, removeSpecial)
  return nodesMapB
}

const removeSpecial = function(node) {
  if (!SPECIAL_PERMISSIONS.includes(node.permission)) {
    return node
  }

  return { ...node, add: false }
}

const invert = unaryMap.bind(null, invertMap)

module.exports = {
  invert,
}
