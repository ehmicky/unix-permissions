import { CATEGORIES } from '../../constants.js'

// Join categories, e.g. `u+x,g+x` -> `ug+x`
export const joinCategories = (node, index, nodes) => {
  const sameNodes = nodes.filter((nodeA) => canJoinNodes(node, nodeA))

  // Nothing to join
  if (sameNodes.length === 1) {
    return node
  }

  const categories = sameNodes.map((nodeA) => nodeA.category)

  // This function iterates over all nodes. We only do the join for the first
  // node, not the following nodes, since they would already be joined.
  if (categories[0] !== node.category) {
    return []
  }

  // `u+x,g+x,o+x` -> `a+x`
  if (categories.length === CATEGORIES.length) {
    return { ...node, category: 'a' }
  }

  return { ...node, category: categories.join('') }
}

const canJoinNodes = (nodeA, nodeB) =>
  nodeA.operator === nodeB.operator && nodeA.permissions === nodeB.permissions
