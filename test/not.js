import test from 'ava'

import { not, normalize } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { isValid } from './helpers/valid.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

performTests({
  title: args => `should negate ${args}`,
  command: 'not',
  data: SIMPLE_DATA,
})

PARSE_DATA.filter(isValid).forEach(({ args: [arg] }) => {
  test(`should have idempotent 'not' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
