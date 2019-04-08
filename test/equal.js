import { equal } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performChecks } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})

performChecks({
  name: "should 'equal' itself",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.true(equal(arg, arg)),
})
