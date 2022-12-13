import { binaryTest } from '../helpers.js'

// Test whether all permissions in `nodesMapB` are included in `nodesMapA`
// Missing permissions in `nodesMapB` are not checked.
// `+` permissions in `nodesMapB` must be `+` in `nodesMapA`
// `-` permissions in `nodesMapB` must be `-` in `nodesMapA`
export const containTest = (nodesMapA, nodesMapB) =>
  Object.entries(nodesMapB).every(([nodeKey, node]) =>
    containNode(node, nodesMapA[nodeKey]),
  )

const containNode = (nodeA, nodeB = {}) => nodeA.add === nodeB.add

export const contain = binaryTest.bind(undefined, containTest)
