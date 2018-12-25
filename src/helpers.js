'use strict'

const { parse } = require('./parse')
const { serialize } = require('./serialize')
const { getTypeByName } = require('./types')

const convert = function(typeName, perm) {
  const type = getTypeByName(typeName)
  const { nodes } = parse(perm)
  const permA = serialize(type, nodes)
  return permA
}

const unaryMap = function(mapFunc, perm) {
  const { type, nodes } = parse(perm)
  const nodesA = mapFunc(nodes)
  const permA = serialize(type, nodesA)
  return permA
}

const binaryMap = function(mapFunc, permA, ...perms) {
  const { type, nodes } = parse(permA)
  const nodesA = perms.reduce(binaryMapReduce.bind(null, mapFunc), nodes)
  const permB = serialize(type, nodesA)
  return permB
}

const binaryMapReduce = function(mapFunc, nodes, perm) {
  const { nodes: nodesA } = parse(perm)
  const nodesB = mapFunc(nodes, nodesA)
  return nodesB
}

const variableMap = function(mapFunc, perm, ...perms) {
  if (perms.length === 0) {
    return perm
  }

  return binaryMap(mapFunc, perm, ...perms)
}

const binaryTest = function(testFunc, permA, ...perms) {
  const { nodes } = parse(permA)
  return perms.every(permB => binaryTestEach(testFunc, nodes, permB))
}

const binaryTestEach = function(testFunc, nodes, perm) {
  const { nodes: nodesA } = parse(perm)
  return testFunc(nodes, nodesA)
}

module.exports = {
  convert,
  unaryMap,
  binaryMap,
  variableMap,
  binaryTest,
}
