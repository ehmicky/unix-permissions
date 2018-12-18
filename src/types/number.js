'use strict'

const name = 'number'

const test = function(perm) {
  return Number.isInteger(perm) && perm <= MAX_NUMBER
}

// eslint-disable-next-line no-magic-numbers
const MAX_NUMBER = 2 ** 12 - 1

module.exports = {
  name,
  test,
}
