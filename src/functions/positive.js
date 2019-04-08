import { unaryMap } from '../helpers.js'
import { omitBy } from '../utils.js'

// Omit all `-` permssions
// E.g. `a=x` -> `a+x,a-rwst` -> `a+x`
const positiveMap = function(nodesMap) {
  return omitBy(nodesMap, isRemoved)
}

const isRemoved = function({ add }) {
  return !add
}

export const positive = unaryMap.bind(null, positiveMap)
