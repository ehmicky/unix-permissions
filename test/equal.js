import { equal } from '../src.js'

import {
  PARSE_DATA,
  EQUAL_DATA,
  performTests,
  performChecks,
} from './helpers.js'

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
