import { normalize } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performChecks } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})

performChecks({
  name: "should have idempotent 'normalize'",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.deepEqual(arg, normalize(arg)),
})
