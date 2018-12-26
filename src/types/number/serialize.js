'use strict'

const { getNode, getCatNode } = require('../../nodes')

const serializeNodes = function(getNodeValue, nodes) {
  return nodes
    .filter(hasAdd)
    .map(node => getNodeValue(node).value)
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add
}

const sum = function(memo, number) {
  return memo + number
}

const serialize = serializeNodes.bind(null, getNode)
const serializeCategory = serializeNodes.bind(null, getCatNode)

module.exports = {
  serialize,
  serializeCategory,
}
