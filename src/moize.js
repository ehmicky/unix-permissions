import moize from 'moize'

import { mapValues } from './utils.js'

// Moize a function, or an object containing functions
const moizeFuncs = function(value) {
  if (typeof value === 'function') {
    return moize(value, { isDeepEqual: true })
  }

  return mapValues(value, moizeFuncs)
}

module.exports = {
  moizeFuncs,
}
