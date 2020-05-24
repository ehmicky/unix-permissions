// Like lodash _.mapValues()
export const mapValues = function (object, mapper) {
  const pairs = Object.entries(object).map(([key, value]) => ({
    [key]: mapper(value, key, object),
  }))
  return Object.assign({}, ...pairs)
}

// Group array of objects together according to a specific key
export const groupBy = function (array, key) {
  // eslint-disable-next-line unicorn/no-reduce
  return array.reduce(groupByReducer.bind(undefined, key), {})
}

const groupByReducer = function (key, groups, obj) {
  const groupName = obj[key]
  const { [groupName]: currentGroup = [] } = groups
  const newGroup = [...currentGroup, obj]
  return { ...groups, [groupName]: newGroup }
}

// Check if an array has duplicate elements
export const hasDuplicate = function (array) {
  return array.some(isDuplicate)
}

const isDuplicate = function (elem, index, elems) {
  return elems.slice(index + 1).some((elemB) => elem === elemB)
}
