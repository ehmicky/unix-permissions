import { getNodeKey } from '../../nodes.js'

import { VALUES } from './constants.js'

// Serialize from `nodes` to a `number` permission
export const serialize = (nodes) =>
  nodes.filter(hasAdd).map(serializeNode).reduce(sum, 0)

const hasAdd = ({ add }) => add === true

const serializeNode = (node) => {
  const nodeKey = getNodeKey(node)
  return VALUES[nodeKey]
}

const sum = (memo, number) => memo + number
