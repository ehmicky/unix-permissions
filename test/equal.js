import test from 'ava'

import { equal } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { removeInvalid } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})

removeInvalid(PARSE_DATA).forEach(({ args: [arg] }) => {
  test(`should 'equal' itself ${JSON.stringify(arg)}`, t => {
    t.true(equal(arg, arg))
  })
})
