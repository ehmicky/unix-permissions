'use strict'

const isUnique = function(node, index, array) {
  return !array.slice(index + 1).some(nodeB => isSameNode(node, nodeB))
}

const isSameNode = function(nodeA, nodeB) {
  return (
    nodeA.category === nodeB.category && nodeA.permission === nodeB.permission
  )
}

module.exports = {
  isUnique,
}
