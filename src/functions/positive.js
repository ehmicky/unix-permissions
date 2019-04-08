const { unaryMap } = require('../helpers')
const { omitBy } = require('../utils')

// Omit all `-` permssions
// E.g. `a=x` -> `a+x,a-rwst` -> `a+x`
const positiveMap = function(nodesMap) {
  return omitBy(nodesMap, isRemoved)
}

const isRemoved = function({ add }) {
  return !add
}

const positive = unaryMap.bind(null, positiveMap)

module.exports = {
  positive,
}
