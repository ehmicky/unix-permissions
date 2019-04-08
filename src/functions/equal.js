import { binaryTest } from '../helpers.js'

import { containTest } from './contain.js'

// Test whether two permissions are exactly the same, including omitted nodes.
// As opposed to using `===`, this works across permissions. It also works
// with non-canonical variations, e.g. `equal('a+x,a+x', 'a+x')` is `true`
const equalTest = function(nodesMapA, nodesMapB) {
  return sameLength(nodesMapA, nodesMapB) && containTest(nodesMapA, nodesMapB)
}

const sameLength = function(nodesMapA, nodesMapB) {
  return Object.keys(nodesMapA).length === Object.keys(nodesMapB).length
}

const equal = binaryTest.bind(null, equalTest)

module.exports = {
  equal,
}
