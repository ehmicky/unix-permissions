'use strict'

const { TYPES_MAP } = require('./types')
const { mapValues } = require('./utils')
const { convert } = require('./helpers')

const getConverters = function() {
  return mapValues(TYPES_MAP, getConverter)
}

const getConverter = function({ name }) {
  return convert.bind(null, name)
}

const converters = getConverters()

module.exports = converters
