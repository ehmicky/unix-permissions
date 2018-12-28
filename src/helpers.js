'use strict'

const { parse } = require('./parse')
const { serialize } = require('./serialize')
const { TYPES_MAP } = require('./types')

// Convert permission to another type
const convert = function(typeName, perm) {
  const { nodesMap } = parse(perm)
  const permA = serialize(TYPES_MAP[typeName], nodesMap)
  return permA
}

const unaryMap = function(mapFunc, perm) {
  const { type, nodesMap } = parse(perm)
  const nodesMapA = mapFunc(nodesMap)
  const permA = serialize(type, nodesMapA)
  return permA
}

const binaryMap = function(mapFunc, perm, ...perms) {
  const { type, nodesMap } = parse(perm)
  const nodesMapA = perms.reduce(binaryMapReduce.bind(null, mapFunc), nodesMap)
  const permA = serialize(type, nodesMapA)
  return permA
}

const binaryMapReduce = function(mapFunc, nodesMap, perm) {
  const { nodesMap: nodesMapA } = parse(perm)
  const nodesMapB = mapFunc(nodesMap, nodesMapA)
  return nodesMapB
}

const variableMap = function(mapFunc, perm, ...perms) {
  if (perm === undefined) {
    return
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
