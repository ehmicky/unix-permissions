'use strict'

// Like lodash _.omitBy()
const omitBy = function(object, condition) {
  const pairs = Object.entries(object)
    .filter(([key, value]) => !condition(key, value))
    .map(([key, value]) => ({ [key]: value }))
  return Object.assign({}, ...pairs)
}

// Similar to lodash _.keyBy()
const keyBy = function(array, attrs) {
  const mapper = Array.isArray(attrs) ? keyByAttrs : keyByAttr
  const pairs = array.map(object => mapper(object, attrs))
  return Object.assign({}, ...pairs)
}

const keyByAttrs = function(object, attrs) {
  const key = attrs.map(attr => object[attr]).join(' ')
  return { [key]: object }
}

const keyByAttr = function(object, attr) {
  return { [object[attr]]: object }
}

// Like lodash _.mapValues()
const mapValues = function(object, mapper) {
  const pairs = Object.entries(object).map(([key, value]) => ({
    [key]: mapper(value, key, object),
  }))
  return Object.assign({}, ...pairs)
}

// Like lodash _.mapKeys()
const mapKeys = function(object, mapper) {
  const pairs = Object.entries(object).map(([key, value]) => ({
    [mapper(value, key, object)]: value,
  }))
  return Object.assign({}, ...pairs)
}

// Is a plain object, including `Object.create(null)`
const isPlainObject = function(val) {
  return (
    typeof val === 'object' &&
    val !== null &&
    (val.constructor === Object || val.constructor === undefined)
  )
}

// Group array of objects together according to a specific key
const groupBy = function(array, key) {
  return array.reduce(groupByReducer.bind(null, key), {})
}

const groupByReducer = function(key, groups, obj) {
  const groupName = obj[key]
  const { [groupName]: currentGroup = [] } = groups
  const newGroup = [...currentGroup, obj]
  return { ...groups, [groupName]: newGroup }
}

module.exports = {
  omitBy,
  keyBy,
  mapValues,
  mapKeys,
  isPlainObject,
  groupBy,
}
