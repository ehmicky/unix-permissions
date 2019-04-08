import { normalize } from '../src.js'

import { PARSE_DATA, performTests, performChecks } from './helpers.js'

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
