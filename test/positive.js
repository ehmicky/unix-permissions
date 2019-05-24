import { positive } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performCheck } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})

PARSE_DATA.forEach(datum => {
  performCheck({
    name: "should have idempotent 'positive'",
    check: ({ t, arg }) => t.deepEqual(positive(arg), positive(positive(arg))),
  }, datum)
})
