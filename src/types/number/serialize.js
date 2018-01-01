'use strict'

const { getNodeKey } = require('../../nodes')

const { VALUES, CAT_VALUES } = require('./constants')

// Serialize from `nodes` to a `number` permission
const serializeNodes = function(values, nodes) {
  return nodes
    .filter(hasAdd)
    .map(node => values[getNodeKey(node)])
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add === true
}

const sum = function(memo, number) {
  return memo + number
}

// `serializeCategory()` uses same logic but with other numberical values
const serialize = serializeNodes.bind(null, VALUES)
const serializeCategory = serializeNodes.bind(null, CAT_VALUES)

module.exports = {
  serialize,
  serializeCategory,
}
