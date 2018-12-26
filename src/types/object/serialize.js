'use strict'

const { LONG_CATEGORIES } = require('../../constants')
const { groupBy, mapKeys, mapValues } = require('../../utils')

const { LONG_PERMISSIONS } = require('./constants')

const serialize = function(nodes) {
  const object = groupBy(nodes, 'category')
  const objectA = mapKeys(object, serializeCategory)
  const objectB = mapValues(objectA, serializePart)
  return objectB
}

const serializeCategory = function(value, key) {
  return LONG_CATEGORIES[key]
}

const serializePart = function(nodes, category) {
  const nodesA = nodes.map(({ permission, add }) =>
    serializePermission({ category, permission, add }),
  )
  const part = Object.assign({}, ...nodesA)
  return part
}

const serializePermission = function({ category, permission, add }) {
  const permissionA = LONG_PERMISSIONS[category][permission]
  return { [permissionA]: add }
}

module.exports = {
  serialize,
}
