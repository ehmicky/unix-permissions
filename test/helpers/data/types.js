'use strict'

const { convert } = require('../../../localpack')

// Add `type` to test data where types come from data
const forEachDataType = function(allData) {
  return Object.entries(allData).flatMap(([type, data]) =>
    addType({ data, type }),
  )
}

// Add `type` to test data where types do not come from data
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
  forEachDataType,
  forEachType,
}
