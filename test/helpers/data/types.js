'use strict'

// Add `type` to test data so it appears in test titles
const addDataTypes = function(data) {
  return Object.entries(data).flatMap(addDataType)
}

const addDataType = function([type, data]) {
  return data.map(args => ({ type, args: [args], title: stringify(args) }))
}

// Stringify test titles, ensuring their uniqueness
const stringify = function(value) {
  if (typeof value !== 'object') {
    return String(value)
  }

  return JSON.stringify(value)
}

module.exports = {
  addDataTypes,
}
