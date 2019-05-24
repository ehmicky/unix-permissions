import test from 'ava'

import { positive } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})

VALID_PARSE_DATA.forEach(({ args: [arg] }) => {
  test(`should have idempotent 'positive' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(positive(arg), positive(positive(arg)))
  })
})
