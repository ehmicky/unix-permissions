import { not } from '../src.js'

import {
  SIMPLE_DATA,
  PARSE_DATA,
  performTests,
  performChecks,
} from './helpers.js'

performTests({
  title: args => `should negate ${args}`,
  command: 'not',
  data: SIMPLE_DATA,
})

performChecks({
  name: "should have idempotent 'not'",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.deepEqual(arg, not(not(arg))),
})
