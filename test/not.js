import test from 'ava'

import { not, normalize } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

SIMPLE_DATA.forEach(arg => {
  test(`not (JavaScript) ${JSON.stringify(arg)}`, t =>
    testCommand({ args: [arg], command: 'not', t }))

  test(`not (CLI) ${JSON.stringify(arg)}`, t =>
    testCli({ args: [arg], command: 'not', t }))
})

VALID_PARSE_DATA.forEach(arg => {
  test(`not idempotence ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
