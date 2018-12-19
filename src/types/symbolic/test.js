'use strict'

const { COMMA_REGEXP, GROUP_REGEXP } = require('./regexp')

const name = 'symbolic'

const test = function(perm) {
  return perm.split(COMMA_REGEXP).every(testGroup)
}

const testGroup = function(group) {
  return GROUP_REGEXP.test(group)
}

module.exports = {
  name,
  test,
}
