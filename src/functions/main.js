'use strict'

const { normalize } = require('./normalize')
const { full } = require('./full')
const { contains } = require('./contains')
const { set } = require('./set')
const { unset } = require('./unset')
const { not } = require('./not')
const { flip } = require('./flip')
const { invert } = require('./invert')

module.exports = {
  normalize,
  full,
  contains,
  set,
  unset,
  not,
  flip,
  invert,
}
