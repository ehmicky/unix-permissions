'use strict'

const { unaryMap } = require('../helpers')
const { mapValues } = require('../utils')

const notMap = function(nodesMap) {
  return mapValues(nodesMap, invertAdd)
}

const invertAdd = function({ add, ...node }) {
  return { ...node, add: !add }
}

const not = unaryMap.bind(null, notMap)

module.exports = {
  not,
  notMap,
}
