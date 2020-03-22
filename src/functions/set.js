import { binaryMap } from '../helpers.js'

// Set permissions from `nodesMapA` to `nodesMap`
// Missing permissions of `nodesMapA` are ignored
// `+` or `-` permissions of `nodesMapA` are set as `+` or `-` to `nodesMap`
const setMap = function (nodesMap, nodesMapA) {
  return { ...nodesMap, ...nodesMapA }
}

export const set = binaryMap.bind(null, setMap)
