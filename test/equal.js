import test from 'ava'

import { equal } from '../src/main.js'

import { performTest } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'

EQUAL_DATA.forEach(datum => {
  performTest({
    title: ([arg, ...args]) =>
      `should test whether ${arg} equals ${args.join(' ')}`,
    command: 'equal',
    datum,
  })
})

VALID_PARSE_DATA.forEach(({ args: [arg] }) => {
  test(`should 'equal' itself ${JSON.stringify(arg)}`, t => {
    t.true(equal(arg, arg))
  })
})
