import filterObj from 'filter-obj'

import { unaryMap } from '../helpers.js'

// Omit all `-` permssions
// E.g. `a=x` -> `a+x,a-rwst` -> `a+x`
const positiveMap = function (nodesMap) {
  return filterObj(nodesMap, hasAdd)
}

const hasAdd = function (key, { add }) {
  return add
}

export const positive = unaryMap.bind(undefined, positiveMap)
