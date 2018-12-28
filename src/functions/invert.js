'use strict'

const { unaryMap } = require('../helpers')
const { mapValues } = require('../utils')
const { SPECIAL_PERMISSIONS } = require('../constants')

const { flipMap } = require('./flip')

// Invert a permission's `+` and `-`, excluding special flags
// Missing permissions are inverted to `+`, i.e. this is as if `full()` had
// been applied.
const invertMap = function(nodesMap) {
  const nodesMapA = flipMap(nodesMap)
  const nodesMapB = mapValues(nodesMapA, unsetSpecial)
  return nodesMapB
}

const unsetSpecial = function(node) {
  if (!isSpecial(node)) {
    return node
  }

  return { ...node, add: false }
}

const isSpecial = function({ permission }) {
  return SPECIAL_PERMISSIONS.includes(permission)
}

const invert = unaryMap.bind(null, invertMap)

module.exports = {
  invert,
}
