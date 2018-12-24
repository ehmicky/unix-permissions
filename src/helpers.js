'use strict'

const { parse, serialize } = require('./parse')

const convert = function(typeName, perm) {
  const { nodes } = parse(perm)
  const permA = serialize(typeName, nodes)
  return permA
}

const unaryMap = function(mapFunc, perm) {
  const { type, nodes } = parse(perm)
  const nodesA = mapFunc(nodes)
  const permA = type.serialize(nodesA)
  return permA
}

const binaryMap = function(mapFunc, permA, permB) {
  const { type, nodes } = parse(permA)
  const { nodes: nodesA } = parse(permB)
  const nodesB = mapFunc(nodes, nodesA)
  const permC = type.serialize(nodesB)
  return permC
}

const binaryTest = function(testFunc, permA, permB) {
  const { nodes } = parse(permA)
  const { nodes: nodesA } = parse(permB)
  const bool = testFunc(nodes, nodesA)
  return bool
}

module.exports = {
  convert,
  unaryMap,
  binaryMap,
  binaryTest,
}
