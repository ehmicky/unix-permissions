import { unaryMap } from '../helpers.js'

// Normalize a permission without modifying its semantics
const normalizeMap = (nodesMap) => nodesMap

export const normalize = unaryMap.bind(undefined, normalizeMap)
