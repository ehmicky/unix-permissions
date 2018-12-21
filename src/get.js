'use strict'

const { TYPES } = require('./types')

const getType = function(perm) {
  return TYPES.find(({ parse }) => parse(perm) !== undefined)
}

const isValid = function(perm) {
  return getType(perm) !== undefined
}

module.exports = {
  getType,
  isValid,
}
