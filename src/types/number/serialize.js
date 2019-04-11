import { getNodeKey } from '../../nodes.js'

import { VALUES } from './constants.js'

// Serialize from `nodes` to a `number` permission
export const serialize = function(nodes) {
  return nodes
    .filter(hasAdd)
    .map(serializeNode)
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add === true
}

const serializeNode = function(node) {
  const nodeKey = getNodeKey(node)
  return VALUES[nodeKey]
}

const sum = function(memo, number) {
  return memo + number
}
