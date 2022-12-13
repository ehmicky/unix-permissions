import { binaryMap } from '../helpers.js'

// Set permissions from `nodesMapA` to `nodesMap`
// Missing permissions of `nodesMapA` are ignored
// `+` or `-` permissions of `nodesMapA` are set as `+` or `-` to `nodesMap`
const setMap = (nodesMap, nodesMapA) => ({ ...nodesMap, ...nodesMapA })

export const set = binaryMap.bind(undefined, setMap)
