import { not } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performChecks } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

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
