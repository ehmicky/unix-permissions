'use strict'

const { SPECIAL_PERMISSIONS } = require('../../constants')
const { NODES_MAP, CAT_NODES_MAP, getNodesMap } = require('../../nodes')

const { NO_PERMISSION } = require('./constants')
const { contractSpecial } = require('./tokenize')

const serializePerm = function(nodesMap, nodes) {
  const addedNodes = getAddedNodes({ nodes })

  const stat = Object.entries(nodesMap)
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

const serialize = serializePerm.bind(null, NODES_MAP)
const serializeCategory = serializePerm.bind(null, CAT_NODES_MAP)

module.exports = {
  serialize,
  serializeCategory,
}
