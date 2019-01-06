'use strict'

const { getNodeKey } = require('../../nodes')

const { VALUES } = require('./constants')

// Serialize from `nodes` to a `number` permission
const serialize = function(nodes) {
  return nodes
    .filter(hasAdd)
    .map(serializeNode)
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add === true
}

const serializeNode = function(node) {
  const nodeKey = getNodeKey(node)
  return VALUES[nodeKey]
}

const sum = function(memo, number) {
  return memo + number
}

module.exports = {
  serialize,
}
