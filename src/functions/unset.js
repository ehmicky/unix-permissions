'use strict'

const { binaryMap } = require('../helpers')

const { setMap } = require('./set')
const { notMap } = require('./not')

// Unset permissions from `nodesMapA` to `nodesMap`
// Missing permissions of `nodesMapA` are ignored
// `+` or `-` permissions of `nodesMapA` are set as `-` or `+` to `nodesMap`
const unsetMap = function(nodesMap, nodesMapA) {
  return setMap(nodesMap, notMap(nodesMapA))
}

const unset = binaryMap.bind(null, unsetMap)

module.exports = {
  unset,
}
