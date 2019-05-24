import test from 'ava'

import { normalize } from '../src/main.js'

import { performTest } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'

VALID_PARSE_DATA.forEach(datum => {
  performTest({
    title: ({ type, title }) => `[${type}] should normalize ${title}`,
    command: 'normalize',
    datum,
  })
})

VALID_PARSE_DATA.forEach(({ args: [arg] }) => {
  test(`should have idempotent 'normalize' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
