'use strict'

const { ORDER } = require('./constants')

// Serialize from a `nodesMap` to a specific type.
// `nodes` uses an intermediary/internal format to facilitate conversions
// between types.
// Whereas parsing is loose, serializing enforce normalized/strict output,
// and has validated/normalized input (thanks to parsing).
const serialize = function(type, nodesMap) {
  const nodes = normalizeNodes({ nodesMap })
  const perm = type.serialize(nodes)
  return perm
}

const serializeCategory = function(type, nodesMap, category) {
  const nodes = normalizeNodes({ nodesMap })
  const catNodes = getCatNodes({ nodes, category })
  const catPerm = type.serializeCategory(catNodes, category)
  return catPerm
}

// `serializeCategory()` get `catNodes` as input
const getCatNodes = function({ nodes, category }) {
  return nodes.filter(node => node.category === category).map(removeCategory)
}

const removeCategory = function({ permission, add }) {
  return { permission, add }
}

// Ensure nodes have a stable order before serializing.
// Many types relies on categories and permissions order.
const normalizeNodes = function({ nodesMap }) {
  return ORDER.map(nodeKey => nodesMap[nodeKey]).filter(Boolean)
}

module.exports = {
  serialize,
  serializeCategory,
}
