import test from 'ava'

import { equal } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'
import { stringifyErrors } from './helpers/error.js'

const eEqual = stringifyErrors(equal)

EQUAL_DATA.forEach(args => {
  test(`equal (JavaScript) ${JSON.stringify(args)}`, t => {
    t.snapshot(eEqual(...args))
  })

  test(`equal (CLI) ${JSON.stringify(args)}`, async t => {
    t.snapshot(await callCli('equal', ...args))
  })
})

VALID_PARSE_DATA.forEach(arg => {
  test(`equal self ${JSON.stringify(arg)}`, t => {
    t.true(equal(arg, arg))
  })
})
