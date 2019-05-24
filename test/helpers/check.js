// eslint-disable-next-line ava/no-ignored-test-files
import test from 'ava'

import { normalize } from '../../src/main.js'

import { getTestName } from './name.js'

// Performs a `check` test function
export const performCheck = function({ name, check }, datum) {
  const title = getTestName(name, datum)
  test(title, performCheckTest.bind(null, { check, ...datum }))
}

const performCheckTest = function({ args: [arg], check, ...datum }, t) {
  const argA = normalizeArg({ t, arg })

  // Invalid permission should not run `check()`
  if (argA === undefined) {
    return
  }

  check({ t, arg: argA, ...datum })
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
