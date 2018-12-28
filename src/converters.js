'use strict'

const { TYPES_MAP } = require('./types')
const { mapValues } = require('./utils')
const { convert } = require('./helpers')

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
