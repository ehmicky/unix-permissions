'use strict'

const { unaryMap } = require('../helpers')
const { SPECIAL_PERMISSIONS } = require('../constants')
const { omitBy } = require('../utils')

const { notMap } = require('./not')

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are inverted.
const invertMap = function(nodesMap) {
  const nodesMapA = notMap(nodesMap)
  const nodesMapB = omitBy(nodesMapA, isSpecial)
  return nodesMapB
}

const isSpecial = function({ permission }) {
  return SPECIAL_PERMISSIONS.includes(permission)
}

const invert = unaryMap.bind(null, invertMap)

module.exports = {
  invert,
}
