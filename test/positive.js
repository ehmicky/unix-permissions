import { positive } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performChecks } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'

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
