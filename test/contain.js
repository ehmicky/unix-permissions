import { contain } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performChecks } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

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
