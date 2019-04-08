const { binaryMap } = require('../helpers')

// Set permissions from `nodesMapA` to `nodesMap`
// Missing permissions of `nodesMapA` are ignored
// `+` or `-` permissions of `nodesMapA` are set as `+` or `-` to `nodesMap`
const setMap = function(nodesMap, nodesMapA) {
  return { ...nodesMap, ...nodesMapA }
}

const set = binaryMap.bind(null, setMap)

module.exports = {
  set,
  setMap,
}
