import test from 'ava'

import { normalize } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { isValid } from './helpers/valid.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})

PARSE_DATA.filter(isValid).forEach(({ args: [arg] }) => {
  test(`should have idempotent 'normalize' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
