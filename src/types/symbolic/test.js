'use strict'

const { COMMA_REGEXP, PART_REGEXP } = require('./regexp')

const name = 'symbolic'

const test = function(perm) {
  return typeof perm === 'string' && perm.split(COMMA_REGEXP).every(testPart)
}

const testPart = function(part) {
  return PART_REGEXP.test(part)
}

module.exports = {
  name,
  test,
}
