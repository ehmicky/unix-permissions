'use strict'

const { keyBy } = require('../utils')

const number = require('./number')
const octal = require('./octal')
const stat = require('./stat')
const symbolic = require('./symbolic')

// Order is significant, because each is tried in order
const TYPES = [number, octal, stat, symbolic]

const TYPES_MAP = keyBy(TYPES, 'name')

module.exports = {
  TYPES,
  TYPES_MAP,
}
