import test from 'ava'

import { normalize } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'

VALID_PARSE_DATA.forEach(({ arg }) => {
  test(`normalize() ${JSON.stringify(arg)}`, t =>
    testCommand({ args: [arg], command: 'normalize', t }))

  test(`normalize() idempotence ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
