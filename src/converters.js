import { TYPES_MAP } from './types.js'
import { mapValues } from './utils.js'
import { convert } from './helpers.js'

// Retrieve a map of all types' convertion functions
const getConverters = function() {
  return mapValues(TYPES_MAP, getConverter)
}

const getConverter = function(type, name) {
  return convert.bind(null, name)
}

const converters = getConverters()

module.exports = {
  convert: converters,
}
