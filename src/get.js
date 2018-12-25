'use strict'

const { TYPES } = require('./types')

const getType = function(perm) {
  return TYPES.find(({ parse }) => parse(perm) !== undefined)
}

module.exports = {
  getType,
}
