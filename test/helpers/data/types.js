'use strict'

// Add `type` to test data so it appears in test titles
const addDataTypes = function(data) {
  return Object.entries(data).flatMap(addDataType)
}

const addDataType = function([type, data]) {
  return data.map(args => ({ type, args: [args] }))
}

module.exports = {
  addDataTypes,
}
