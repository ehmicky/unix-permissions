'use strict'

const { normalize } = require('./normalize')
const { full } = require('./full')
const { partial } = require('./partial')
const { contains } = require('./contains')
const { set } = require('./set')
const { unset } = require('./unset')
const { flip } = require('./flip')
const { invert } = require('./invert')
const { min, max } = require('./min_max')

module.exports = {
  normalize,
  full,
  partial,
  contains,
  set,
  unset,
  flip,
  invert,
  min,
  max,
}
