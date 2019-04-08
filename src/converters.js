import { TYPES_MAP } from './types/main.js'
import { mapValues } from './utils.js'
import { convert as convertValue } from './helpers.js'

// Retrieve a map of all types' convertion functions
const getConverters = function() {
  return mapValues(TYPES_MAP, getConverter)
}

const getConverter = function(type, name) {
  return convertValue.bind(null, name)
}

export const convert = getConverters()
