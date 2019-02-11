// eslint-disable-next-line ava/no-ignored-test-files
'use strict'

const test = require('ava')

const { normalize } = require('../..')

// Performs a `check` test function iteratively over each `data`
const performChecks = function({ name, data, check }) {
  data.forEach(performCheck.bind(null, { name, check }))
}

const performCheck = function({ name, check }, datum) {
  test(
    getTestName({ name, ...datum }),
    performCheckTest.bind(null, { check, ...datum }),
  )
}

const performCheckTest = function({ args: [arg], check, ...datum }, t) {
  const argA = normalizeArg({ t, arg })

  // Invalid permission should not run `check()`
  if (argA === undefined) {
    return
  }

  check({ t, arg: argA, ...datum })
}

// Retrieve a different test name for each iteration
const getTestName = function({ type, otherType, category, name, title }) {
  const prefix = getPrefix({ type, otherType, category })

  return `${prefix} ${name} with ${title}`
}

const getPrefix = function({ type, otherType, category }) {
  return [type, otherType, category]
    .filter(Boolean)
    .map(addBracket)
    .join(' ')
}

const addBracket = function(name) {
  return `[${name}]`
}

// Normalize permission argument before starting the test, so that differences
// do not come from normalization.
const normalizeArg = function({ t, arg }) {
  try {
    return normalize(arg)
  } catch (error) {
    // Otherwise `ava` complains to tests were run
    t.true(true)
  }
}

module.exports = {
  performChecks,
}
