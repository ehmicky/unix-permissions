import { ORDER } from './constants.js'

// Serialize from a `nodesMap` to a specific type.
// `nodes` uses an intermediary/internal format to facilitate conversions
// between types.
// Whereas parsing is loose, serializing enforce normalized/strict output,
// and has validated/normalized input (thanks to parsing).
export const serialize = function(type, nodesMap) {
  const nodes = normalizeNodes({ nodesMap })
  const perm = type.serialize(nodes)
  return perm
}

// Ensure nodes have a stable order before serializing.
// Many types relies on categories and permissions order.
const normalizeNodes = function({ nodesMap }) {
  return ORDER.map(nodeKey => nodesMap[nodeKey]).filter(Boolean)
}
