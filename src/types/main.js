'use strict'

const number = require('./number')
const octal = require('./octal')
const stat = require('./stat')
const symbolic = require('./symbolic')
const object = require('./object')

// Order is significant, because each is tried in order
const TYPES = [number, octal, stat, symbolic, object]

const TYPES_MAP = { number, octal, stat, symbolic, object }

module.exports = {
  TYPES,
  TYPES_MAP,
}
