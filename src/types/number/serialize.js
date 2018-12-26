'use strict'

const { getNodeKey } = require('../../nodes')

const { VALUES, CAT_VALUES } = require('./constants')

const serializeNodes = function(values, nodes) {
  return nodes
    .filter(hasAdd)
    .map(node => values[getNodeKey(node)])
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add
}

const sum = function(memo, number) {
  return memo + number
}

const serialize = serializeNodes.bind(null, VALUES)
const serializeCategory = serializeNodes.bind(null, CAT_VALUES)

module.exports = {
  serialize,
  serializeCategory,
}
