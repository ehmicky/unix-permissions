import test from 'ava'

import { equal } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'

EQUAL_DATA.forEach(args => {
  test(`equal (JavaScript) ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: equal, t }))

  test(`equal (CLI) ${JSON.stringify(args)}`, t =>
    testCli({ args, command: 'equal', t }))
})

VALID_PARSE_DATA.forEach(arg => {
  test(`equal self ${JSON.stringify(arg)}`, t => {
    t.true(equal(arg, arg))
  })
})
