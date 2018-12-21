'use strict'

const { getNode } = require('../../nodes')

const serialize = function(nodes) {
  const nodesA = nodes.filter(hasAdd)
  return serializeNodes(nodesA)
}

const serializeNodes = function(nodes) {
  return nodes.map(getValue).reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add
}

const getValue = function({ category, permission }) {
  const { value } = getNode({ category, permission })
  return value
}

const sum = function(memo, number) {
  return memo + number
}

module.exports = {
  serialize,
  serializeNodes,
}
