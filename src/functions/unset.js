'use strict'

const { binaryMap } = require('../helpers')

const { setMap } = require('./set')
const { notMap } = require('./not')

const unsetMap = function(nodesMap, nodesMapA) {
  return setMap(nodesMap, notMap(nodesMapA))
}

const unset = binaryMap.bind(null, unsetMap)

module.exports = {
  unset,
}
