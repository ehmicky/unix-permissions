'use strict'

const { SPECIAL_PERMISSIONS } = require('../../constants')
const { NODES_MAP, getNodesMap } = require('../../nodes')

const { NO_PERMISSION } = require('./constants')
const { contractSpecial } = require('./tokenize')

const serialize = function(nodes) {
  const addedNodes = getAddedNodes({ nodes })

  const stat = Object.entries(NODES_MAP)
    .map(([nodeKey, node]) => serializeNode({ node, nodeKey, addedNodes }))
    .join('')
  const statA = contractSpecial(stat)
  return statA
}

const getAddedNodes = function({ nodes }) {
  const nodesA = nodes.filter(hasAdd)
  return getNodesMap(nodesA)
}

const hasAdd = function({ add }) {
  return add
}

const serializeNode = function({ node: { permission }, nodeKey, addedNodes }) {
  if (addedNodes[nodeKey] !== undefined) {
    return permission
  }

  if (SPECIAL_PERMISSIONS.includes(permission)) {
    return ''
  }

  return NO_PERMISSION
}

module.exports = {
  serialize,
}
