import { unaryMap } from '../helpers.js'
import { mapValues } from '../utils.js'

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are inverted.
export const notMap = (nodesMap) => mapValues(nodesMap, notNode)

const notNode = ({ add, ...node }) => ({ ...node, add: !add })

export const not = unaryMap.bind(undefined, notMap)
