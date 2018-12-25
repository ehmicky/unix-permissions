'use strict'

const assert = require('assert')

const { keyBy } = require('../utils')

const number = require('./number')
const octal = require('./octal')
const stat = require('./stat')
const symbolic = require('./symbolic')
const object = require('./object')

// Order is significant, because each is tried in order
const TYPES = [number, octal, stat, symbolic, object]

const TYPES_MAP = keyBy(TYPES, 'name')

const getTypeByName = function(typeName) {
  const type = TYPES_MAP[typeName]
  assert(type !== undefined, `Invalid type: ${typeName}`)
  return type
}

module.exports = {
  TYPES,
  TYPES_MAP,
  getTypeByName,
}
