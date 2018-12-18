'use strict'

const { getType, isValid } = require('./type')

module.exports = {
  getType,
  isValid,
  ...require('./converters'),
}
