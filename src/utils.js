// Like lodash _.mapValues()
export const mapValues = (object, mapper) => {
  const pairs = Object.entries(object).map(([key, value]) => ({
    [key]: mapper(value, key, object),
  }))
  return Object.assign({}, ...pairs)
}

// Group array of objects together according to a specific key
export const groupBy = (array, key) =>
  array.reduce(groupByReducer.bind(undefined, key), {})

const groupByReducer = (key, groups, obj) => {
  const groupName = obj[key]
  const { [groupName]: currentGroup = [] } = groups
  const newGroup = [...currentGroup, obj]
  return { ...groups, [groupName]: newGroup }
}

// Check if an array has duplicate elements
export const hasDuplicate = (array) => array.some(isDuplicate)

const isDuplicate = (elem, index, elems) =>
  elems.slice(index + 1).includes(elem)
