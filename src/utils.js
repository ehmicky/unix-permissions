// Like lodash _.omitBy()
export const omitBy = function(object, condition) {
  const pairs = Object.entries(object)
    .filter(([key, value]) => !condition(value, key))
    .map(([key, value]) => ({ [key]: value }))
  return Object.assign({}, ...pairs)
}

// Like lodash _.mapValues()
export const mapValues = function(object, mapper) {
  const pairs = Object.entries(object).map(([key, value]) => ({
    [key]: mapper(value, key, object),
  }))
  return Object.assign({}, ...pairs)
}

// Is a plain object, including `Object.create(null)`
export const isPlainObject = function(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    (val.constructor === Object || val.constructor === undefined)
  )
}

// Group array of objects together according to a specific key
export const groupBy = function(array, key) {
  return array.reduce(groupByReducer.bind(null, key), {})
}

const groupByReducer = function(key, groups, obj) {
  const groupName = obj[key]
  const { [groupName]: currentGroup = [] } = groups
  const newGroup = [...currentGroup, obj]
  return { ...groups, [groupName]: newGroup }
}

// Check if an array has duplicate elements
export const hasDuplicate = function(array) {
  return array.some(isDuplicate)
}

const isDuplicate = function(elem, index, elems) {
  return elems.slice(index + 1).some(elemB => elem === elemB)
}
