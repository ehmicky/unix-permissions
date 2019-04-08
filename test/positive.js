import { positive } from '../src.js'

import {
  PARSE_DATA,
  POSITIVE_DATA,
  performTests,
  performChecks,
} from './helpers.js'

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})

performChecks({
  name: "should have idempotent 'positive'",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.deepEqual(positive(arg), positive(positive(arg))),
})
