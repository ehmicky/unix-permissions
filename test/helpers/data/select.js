'use strict'

const { PARSE_DATA } = require('./parse')
const { forEachCategory } = require('./repeat')

const SELECT_DATA = forEachCategory(PARSE_DATA)

module.exports = {
  SELECT_DATA,
}
