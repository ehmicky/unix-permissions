import { contain } from '../src.js'

import {
  PARSE_DATA,
  CONTAIN_DATA,
  performTests,
  performChecks,
} from './helpers.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contain',
  data: CONTAIN_DATA,
})

performChecks({
  name: "should 'contain' itself",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.true(contain(arg, arg)),
})
