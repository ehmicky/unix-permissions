'use strict'

const { normalize } = require('../../localpack')

const normalizeArg = function({ t, arg }) {
  try {
    return normalize(arg)
  } catch (error) {
    // Otherwise `ava` complains to tests were run
    t.true(true)
  }
}

module.exports = {
  normalizeArg,
}
