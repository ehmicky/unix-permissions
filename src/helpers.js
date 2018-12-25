'use strict'

const { parse } = require('./parse')
const { serialize } = require('./serialize')
const { getTypeByName } = require('./types')

const convert = function(typeName, perm) {
  const type = getTypeByName(typeName)
  const { nodesMap } = parse(perm)
  const permA = serialize(type, nodesMap)
  return permA
}

const unaryMap = function(mapFunc, perm) {
  const { type, nodesMap } = parse(perm)
  const nodesMapA = mapFunc(nodesMap)
  const permA = serialize(type, nodesMapA)
  return permA
}

const binaryMap = function(mapFunc, permA, ...perms) {
  const { type, nodesMap } = parse(permA)
  const nodesMapA = perms.reduce(binaryMapReduce.bind(null, mapFunc), nodesMap)
  const permB = serialize(type, nodesMapA)
  return permB
}

const binaryMapReduce = function(mapFunc, nodesMap, perm) {
  const { nodesMap: nodesMapA } = parse(perm)
  const nodesMapB = mapFunc(nodesMap, nodesMapA)
  return nodesMapB
}

const variableMap = function(mapFunc, perm, ...perms) {
  if (perms.length === 0) {
    return perm
  }

  return binaryMap(mapFunc, perm, ...perms)
}

const binaryTest = function(testFunc, permA, ...perms) {
  const { nodesMap } = parse(permA)
  return perms.every(permB => binaryTestEach(testFunc, nodesMap, permB))
}

const binaryTestEach = function(testFunc, nodesMap, perm) {
  const { nodesMap: nodesMapA } = parse(perm)
  return testFunc(nodesMap, nodesMapA)
}

module.exports = {
  convert,
  unaryMap,
  binaryMap,
  variableMap,
  binaryTest,
}
