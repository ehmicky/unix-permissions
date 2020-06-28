import keepFuncProps from 'keep-func-props'
import moize from 'moize'

import { mapValues } from './utils.js'

const kMoize = keepFuncProps(moize)

// Moize a function, or an object containing functions
export const moizeFuncs = function (value) {
  if (typeof value === 'function') {
    return kMoize(value, { isDeepEqual: true, maxSize: 1e4 })
  }

  return mapValues(value, moizeFuncs)
}
