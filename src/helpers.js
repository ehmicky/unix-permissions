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

const binaryMap = function(mapFunc, permA, ...perms) {
  const { type, nodes } = parse(permA)
  const nodesA = perms.reduce(binaryMapReduce.bind(null, mapFunc), nodes)
  const permB = type.serialize(nodesA)
  return permB
}

const binaryMapReduce = function(mapFunc, nodes, perm) {
  const { nodes: nodesA } = parse(perm)
  const nodesB = mapFunc(nodes, nodesA)
  return nodesB
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
