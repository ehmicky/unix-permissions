'use strict'

const { unaryMap } = require('../helpers')
const { SPECIAL_PERMISSIONS } = require('../constants')
const { NODES_MAP } = require('../nodes')
const { mapValues } = require('../utils')

// Invert a permission's `+` and `-`.
// Missing permissions are not inverted.
// Special flags are unset unless the permission is partial. This is because:
//  - `not()` or `unset()` on `u+s` should be `u-s`, `-1555` should be `+1555`
//  - but `not()` or `unset()` on `1555` should be `0222`
// I.e. setting special flags as part of `not()` or `unset()` should only be
// done when explicit.
const notMap = function(nodesMap) {
  const nodesMapA = mapValues(nodesMap, node => notNode({ node }))

  if (isPartial({ nodesMap })) {
    return nodesMapA
  }

  const nodesMapB = mapValues(nodesMapA, unsetSpecial)
  return nodesMapB
}

const notNode = function({ node, node: { add } }) {
  return { ...node, add: !add }
}

const isPartial = function({ nodesMap }) {
  return Object.keys(nodesMap).length !== Object.keys(NODES_MAP).length
}

const unsetSpecial = function(node) {
  if (!isSpecial(node)) {
    return node
  }

  return { ...node, add: false }
}

const isSpecial = function({ permission }) {
  return SPECIAL_PERMISSIONS.includes(permission)
}

const not = unaryMap.bind(null, notMap)

module.exports = {
  not,
}
