'use strict'

const { unaryMap } = require('../helpers')
const { omitBy } = require('../utils')

const partialMap = function(nodesMap) {
  return omitBy(nodesMap, isRemoved)
}

const isRemoved = function({ add }) {
  return !add
}

const partial = unaryMap.bind(null, partialMap)

module.exports = {
  partial,
}
