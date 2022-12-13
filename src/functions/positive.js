import { includeKeys } from 'filter-obj'

import { unaryMap } from '../helpers.js'

// Omit all `-` permissions
// E.g. `a=x` -> `a+x,a-rwst` -> `a+x`
const positiveMap = (nodesMap) => includeKeys(nodesMap, hasAdd)

const hasAdd = (key, { add }) => add

export const positive = unaryMap.bind(undefined, positiveMap)
