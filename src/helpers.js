import { parse } from './parse.js'
import { serialize } from './serialize.js'
import { TYPES_MAP } from './types/main.js'

// Convert permission to another type
export const convert = (typeName, perm) => {
  const { nodesMap } = parse(perm)
  const permA = serialize(TYPES_MAP[typeName], nodesMap)
  return permA
}

// Transform a mapping function `(nodes) -> nodes` to a mapping function
// `(perm) -> perm`
export const unaryMap = (mapFunc, perm) => {
  const { type, nodesMap } = parse(perm)
  const nodesMapA = mapFunc(nodesMap)
  const permA = serialize(type, nodesMapA)
  return permA
}

// Transform a mapping function `(nodesA, nodesB) -> nodesC` to a
// mapping function `(permA, permB[, ...perms]) -> perm`
export const binaryMap = (mapFunc, perm, ...perms) => {
  const { type, nodesMap } = parse(perm)
  const nodesMapA = perms.reduce(
    binaryMapReduce.bind(undefined, mapFunc),
    nodesMap,
  )
  const permA = serialize(type, nodesMapA)
  return permA
}

const binaryMapReduce = (mapFunc, nodesMap, perm) => {
  const { nodesMap: nodesMapA } = parse(perm)
  const nodesMapB = mapFunc(nodesMap, nodesMapA)
  return nodesMapB
}

// Same but allows 0 or 1 arguments
export const variableMap = (mapFunc, perm, ...perms) => {
  if (perm === undefined) {
    return
  }

  return binaryMap(mapFunc, perm, ...perms)
}

// Transform a test function `(nodesA, nodesB) -> boolean` to a
// test function `(permA, permB[, ...perms]) -> boolean`
export const binaryTest = (testFunc, permA, ...perms) => {
  const { nodesMap } = parse(permA)
  return (
    perms.length !== 0 &&
    perms.every((permB) => binaryTestEach(testFunc, nodesMap, permB))
  )
}

const binaryTestEach = (testFunc, nodesMap, perm) => {
  const { nodesMap: nodesMapA } = parse(perm)
  return testFunc(nodesMap, nodesMapA)
}
