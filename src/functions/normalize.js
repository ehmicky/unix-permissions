const { unaryMap } = require('../helpers')

// Normalize a permission without modifying its semantics
const normalizeMap = function(nodesMap) {
  return nodesMap
}

const normalize = unaryMap.bind(null, normalizeMap)

module.exports = {
  normalize,
}
