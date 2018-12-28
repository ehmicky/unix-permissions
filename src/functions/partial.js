'use strict'

const { unaryMap } = require('../helpers')
const { omitBy } = require('../utils')

// Inverse of `full()`: omit all `-` permssions
// E.g. `a=x` -> `a+x,a-rwst` -> `a+x`
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
