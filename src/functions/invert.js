import { unaryMap } from '../helpers.js'
import { SPECIAL_PERMISSIONS } from '../constants.js'
import { omitBy } from '../utils.js'

import { notMap } from './not.js'

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are inverted.
const invertMap = function(nodesMap) {
  const nodesMapA = notMap(nodesMap)
  const nodesMapB = omitBy(nodesMapA, isSpecial)
  return nodesMapB
}

const isSpecial = function({ permission }) {
  return SPECIAL_PERMISSIONS.includes(permission)
}

export const invert = unaryMap.bind(null, invertMap)
