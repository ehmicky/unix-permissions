'use strict'

const { forEachDataType } = require('../types')

const octal = require('./octal')
const number = require('./number')
const stat = require('./stat')
const symbolic = require('./symbolic')
const object = require('./object')

const PARSE_DATA = forEachDataType({ number, octal, stat, symbolic, object })

module.exports = {
  PARSE_DATA,
}
