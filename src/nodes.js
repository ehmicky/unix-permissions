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

/* eslint-disable id-length */
const PERMISSION_CATEGORIES = {
  r: ['o', 'g', 'u'],
  w: ['o', 'g', 'u'],
  x: ['o', 'g', 'u'],
  t: ['o'],
  s: ['g', 'u'],
}

const CATEGORY_PERMISSIONS = {
  a: ['x', 'w', 'r', 't', 's'],
  u: ['x', 'w', 'r', 's'],
  g: ['x', 'w', 'r', 's'],
  o: ['x', 'w', 'r', 't'],
}
/* eslint-enable id-length */

module.exports = {
  getNodeKey,
  getNode,
  PERMISSION_CATEGORIES,
  CATEGORY_PERMISSIONS,
}
