'use strict'

const { LONG_CATEGORIES } = require('../../constants')
const { groupBy, mapKeys, mapValues } = require('../../utils')

const { LONG_PERMISSIONS } = require('./constants')

// Serialize from `nodes` to a `object` permission
const serialize = function(nodes) {
  const object = groupBy(nodes, 'category')
  const objectA = mapKeys(object, renameCategory)
  const objectB = mapValues(objectA, serializePart)
  return objectB
}

const serializeCategory = function(catNodes, category) {
  const categoryA = LONG_CATEGORIES[category]
  return serializePart(catNodes, categoryA)
}

// From short category to long category
const renameCategory = function(value, key) {
  return LONG_CATEGORIES[key]
}

// Serialize each category's nodes
const serializePart = function(nodes, category) {
  const nodesA = nodes.map(({ permission, add }) =>
    serializePermission({ category, permission, add }),
  )
  const part = Object.assign({}, ...nodesA)
  return part
}

// Serialize each category's permission
const serializePermission = function({ category, permission, add }) {
  const permissionA = LONG_PERMISSIONS[category][permission]
  return { [permissionA]: add }
}

module.exports = {
  serialize,
  serializeCategory,
}
