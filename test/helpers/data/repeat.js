'use strict'

const { convert, select } = require('../../../localpack')

// Iterate data over any `category`
const forEachCategory = function(data) {
  return Object.keys(select).flatMap(category =>
    addCategory({ data, category }),
  )
}

const addCategory = function({ data, category }) {
  return data.map(datum => ({ ...datum, category }))
}

// Iterate data over `type`, where `type` comes from data
const forEachDataType = function(allData) {
  return Object.entries(allData).flatMap(([type, data]) =>
    addType({ data, type }),
  )
}

// Iterate data over any `type`
const forEachType = function(data) {
  return Object.entries(convert).flatMap(([type, func]) =>
    addType({ data, type, func }),
  )
}

const addType = function({ data, type, func }) {
  return data.map(args => ({
    type,
    args: [args],
    func,
    title: stringify(args),
  }))
}

// Stringify test titles, ensuring their uniqueness
const stringify = function(value) {
  if (typeof value !== 'object') {
    return String(value)
  }

  return JSON.stringify(value)
}

module.exports = {
  forEachCategory,
  forEachDataType,
  forEachType,
}
