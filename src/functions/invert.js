'use strict'

const { unaryMap } = require('../helpers')
const { omitBy } = require('../utils')
const { SPECIAL_PERMISSIONS } = require('../constants')

const { flipMap } = require('./flip')

const invertMap = function(nodesMap) {
  const nodesMapA = flipMap(nodesMap)
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
