'use strict'

const { unaryMap } = require('../helpers')

const { fullMap } = require('./full')
const { notMap } = require('./not')

const flipMap = function(nodesMap) {
  return notMap(fullMap(nodesMap))
}

const flip = unaryMap.bind(null, flipMap)

module.exports = {
  flip,
}
