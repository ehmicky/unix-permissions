'use strict'

// Stringify test titles, ensuring their uniqueness
const stringify = function(value) {
  if (typeof value !== 'object') {
    return String(value)
  }

  return JSON.stringify(value)
}

module.exports = {
  stringify,
}
