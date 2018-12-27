'use strict'

const { CATEGORIES } = require('../../constants')

const joinCategories = function(node, index, nodes) {
  const sameNodes = nodes.filter(nodeA => canJoinNodes(node, nodeA))

  if (sameNodes.length === 1) {
    return node
  }

  const categories = sameNodes.map(nodeA => nodeA.category)

  if (categories[0] !== node.category) {
    return []
  }

  if (categories.length === CATEGORIES.length) {
    return { ...node, category: 'a' }
  }

  return { ...node, category: categories.join('') }
}

const canJoinNodes = function(nodeA, nodeB) {
  return (
    nodeA.operator === nodeB.operator && nodeA.permissions === nodeB.permissions
  )
}

module.exports = {
  joinCategories,
}
