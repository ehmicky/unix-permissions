import { contain } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performCheck } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contain',
  data: CONTAIN_DATA,
})

PARSE_DATA.forEach(datum => {
  performCheck({
    name: "should 'contain' itself",
    check: ({ t, arg }) => t.true(contain(arg, arg)),
  }, datum)
})
