import test from 'ava'

import { normalize } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: VALID_PARSE_DATA,
})

VALID_PARSE_DATA.forEach(({ args: [arg] }) => {
  test(`should have idempotent 'normalize' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
