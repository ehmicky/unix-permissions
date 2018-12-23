'use strict'

const { NODES } = require('./constants')
const { keyBy } = require('./utils')

// Must be sorted by `order` because some types' serialization relies on
// nodes being sorted accordingly.
const getNode = function({ category, permission }) {
  const nodeKey = getNodeKey({ category, permission })
  return NODES_MAP[nodeKey]
}

const getNodeKey = function({ category, permission }) {
  return `${category} ${permission}`
}

const NODES_MAP = keyBy(NODES, ['category', 'permission'])

module.exports = {
  getNodeKey,
  getNode,
}
