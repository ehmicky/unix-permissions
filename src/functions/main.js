'use strict'

const { normalize } = require('./normalize')
const { full } = require('./full')
const { contains } = require('./contains')
const { set } = require('./set')
const { unset } = require('./unset')
const { not } = require('./not')

module.exports = {
  normalize,
  full,
  contains,
  set,
  unset,
  not,
}
