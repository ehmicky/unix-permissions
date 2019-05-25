import test from 'ava'

import { normalize } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'

VALID_PARSE_DATA.forEach(({ type, arg }) => {
  test(`normalize() ${JSON.stringify({ type, arg })}`, t =>
    testCommand({ args: [arg], command: 'normalize', t }))
})

VALID_PARSE_DATA.forEach(({ type, arg }) => {
  test(`normalize() idempotence ${JSON.stringify({ type, arg })}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
