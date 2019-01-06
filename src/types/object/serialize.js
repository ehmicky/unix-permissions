'use strict'

const { LONG_CATEGORIES } = require('../../constants')
const { groupBy, mapKeys, mapValues, omitBy } = require('../../utils')

const { LONG_PERMISSIONS, ALL_PERMISSIONS } = require('./constants')

// Serialize from `nodes` to a `object` permission
const serialize = function(nodes) {
  const object = groupBy(nodes, 'category')
  const objectA = mapKeys(object, renameCategory)
  const objectB = mapValues(objectA, serializePart)
  const objectC = serializeAll(objectB)
  return objectC
}

// `serializeCategory()` uses same logic except the category-related one.
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

// Try to use `all` category when possible
const serializeAll = function(object) {
  return ALL_PERMISSIONS.reduce(serializeAllPermission, object)
}

const serializeAllPermission = function(object, permission) {
  const value = getAllValue({ object, category: FIRST_CATEGORY, permission })

  if (!canSerializeAll({ object, permission, value })) {
    return object
  }

  const objectA = mapValues(object, part => omitPermission(part, permission))
  const objectB = omitBy(objectA, isEmptyPart)

  return { ...objectB, all: { ...objectB.all, [permission]: value } }
}

const getAllValue = function({
  permission,
  category,
  object: { [category]: { [permission]: value } = {} },
}) {
  return value
}

const canSerializeAll = function({ object, permission, value }) {
  return (
    value !== undefined &&
    OTHER_CATEGORIES.every(
      category => getAllValue({ object, category, permission }) === value,
    )
  )
}

const omitPermission = function(part, permission) {
  return omitBy(part, (value, key) => key === permission)
}

const [FIRST_CATEGORY, ...OTHER_CATEGORIES] = Object.keys(LONG_PERMISSIONS)

const isEmptyPart = function(part) {
  return Object.keys(part).length === 0
}

module.exports = {
  serialize,
  serializeCategory,
}
