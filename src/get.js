'use strict'

const { getTypeByPerm } = require('./type')

const getType = function(perm) {
  const type = getTypeByPerm(perm)

  if (type === undefined) {
    return 'invalid'
  }

  return type.name
}

const isValid = function(perm) {
  return getTypeByPerm(perm) !== undefined
}

module.exports = {
  getType,
  isValid,
}
