'use strict'

const { forEachType } = require('./repeat')
const { SIMPLE_DATA } = require('./simple')

const SERIALIZE_DATA = forEachType(SIMPLE_DATA)

module.exports = {
  SERIALIZE_DATA,
}
