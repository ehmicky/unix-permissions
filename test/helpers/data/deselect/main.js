'use strict'

const { forEachDataType, forEachCategory } = require('../repeat')

const octal = require('./octal')
const number = require('./number')
const stat = require('./stat')
const object = require('./object')
const symbolic = require('./symbolic')

const DESELECT_DATA = forEachCategory(
  forEachDataType({ number, octal, stat, symbolic, object }),
)

module.exports = {
  DESELECT_DATA,
}
