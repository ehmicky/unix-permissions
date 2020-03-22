import filterObj from 'filter-obj'

import { unaryMap } from '../helpers.js'
import { SPECIAL_PERMISSIONS } from '../constants.js'

import { notMap } from './not.js'

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are inverted.
const invertMap = function (nodesMap) {
  const nodesMapA = notMap(nodesMap)
  const nodesMapB = filterObj(nodesMapA, isNormal)
  return nodesMapB
}

const isNormal = function (key, { permission }) {
  return !SPECIAL_PERMISSIONS.includes(permission)
}

export const invert = unaryMap.bind(null, invertMap)
