'use strict'

const { keyBy } = require('../utils')

const symbolic = require('./symbolic')
const number = require('./number')
const stat = require('./stat')

// Order is significant, because each is tried in order
const TYPES = [number, symbolic, stat]

const TYPES_MAP = keyBy(TYPES, 'name')

module.exports = {
  TYPES,
  TYPES_MAP,
}
