import test from 'ava'

import { not, normalize } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

SIMPLE_DATA.forEach(datum => {
  test(`not() ${JSON.stringify(datum)}`, t => testCommand({ datum, command: 'not', t }))
})

VALID_PARSE_DATA.forEach(({ arg }) => {
  test(`should have idempotent 'not' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
