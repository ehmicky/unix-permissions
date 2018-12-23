'use strict'

const { NODES, SPECIAL_PERMISSIONS } = require('../../constants')
const { getNodeKey } = require('../../nodes')

const { contractSpecial } = require('./tokenize')

const serialize = function(nodes) {
  const addedNodes = getAddedNodes({ nodes })

  const stat = NODES.map(node => serializeNode({ node, addedNodes })).join('')
  const statA = contractSpecial(stat)
  return statA
}

const getAddedNodes = function({ nodes }) {
  return nodes.filter(hasAdd).map(getNodeKey)
}

const hasAdd = function({ add }) {
  return add
}

const serializeNode = function({ node, node: { permission }, addedNodes }) {
  const nodeKey = getNodeKey(node)
  const added = addedNodes.includes(nodeKey)

  if (added) {
    return permission
  }

  if (SPECIAL_PERMISSIONS.includes(permission)) {
    return ''
  }

  return '-'
}

module.exports = {
  serialize,
}
