'use strict'

const { getNodeKey, getCatNodeKey } = require('../../nodes')

const { VALUES, CAT_VALUES } = require('./constants')

const serializeNodes = function({ getKey, values }, nodes) {
  return nodes
    .filter(hasAdd)
    .map(node => serializeNode({ node, getKey, values }))
    .reduce(sum, 0)
}

const hasAdd = function({ add }) {
  return add
}

const serializeNode = function({ node, getKey, values }) {
  const nodeKey = getKey(node)
  return values[nodeKey]
}

const sum = function(memo, number) {
  return memo + number
}

const serialize = serializeNodes.bind(null, {
  getKey: getNodeKey,
  values: VALUES,
})
const serializeCategory = serializeNodes.bind(null, {
  getKey: getCatNodeKey,
  values: CAT_VALUES,
})

module.exports = {
  serialize,
  serializeCategory,
}
