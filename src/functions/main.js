'use strict'

const { normalize } = require('./normalize')
const { full } = require('./full')
const { contains } = require('./contains')
const { set } = require('./set')
const { unset } = require('./unset')
const { flip } = require('./flip')
const { invert } = require('./invert')
const { min, max } = require('./min_max')

module.exports = {
  normalize,
  full,
  contains,
  set,
  unset,
  flip,
  invert,
  min,
  max,
}
