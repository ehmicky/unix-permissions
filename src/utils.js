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

module.exports = {
  omitBy,
  keyBy,
}
