import { excludeKeys } from 'filter-obj'

import { SPECIAL_PERMISSIONS } from '../constants.js'
import { unaryMap } from '../helpers.js'

import { notMap } from './not.js'

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are inverted.
const invertMap = function (nodesMap) {
  const nodesMapA = notMap(nodesMap)
  const nodesMapB = excludeKeys(nodesMapA, isSpecial)
  return nodesMapB
}

const isSpecial = function (key, { permission }) {
  return SPECIAL_PERMISSIONS.has(permission)
}

export const invert = unaryMap.bind(undefined, invertMap)
