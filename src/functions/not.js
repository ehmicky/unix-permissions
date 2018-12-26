'use strict'

const { mapValues } = require('../utils')

const notMap = function(nodesMap) {
  return mapValues(nodesMap, invertAdd)
}

const invertAdd = function({ add, ...node }) {
  return { ...node, add: !add }
}

module.exports = {
  notMap,
}
