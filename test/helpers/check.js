// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'

import { normalize } from '../../src/main.js'

// Performs a `check` test function
export const performCheck = function({ name, check }, datum) {
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
