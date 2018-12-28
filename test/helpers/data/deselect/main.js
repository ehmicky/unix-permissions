'use strict'

const { forEachDataType, forEachCategory } = require('../repeat')

const octal = require('./octal')
const number = require('./number')
const stat = require('./stat')
const symbolic = require('./symbolic')
const object = require('./object')

const DESELECT_DATA = forEachCategory(
  forEachDataType({ number, octal, stat, symbolic, object }),
)

module.exports = {
  DESELECT_DATA,
}
