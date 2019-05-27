import test from 'ava'
import testEach from 'test-each'

import { not, normalize } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { stringifyErrors } from './helpers/error.js'

const eNot = stringifyErrors(not)

testEach(SIMPLE_DATA, ({ title }, arg) => {
  test(`not (JavaScript) | ${title}`, t => {
    t.snapshot(eNot(arg))
  })

  test(`not (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('not', arg))
  })
})

testEach(VALID_PARSE_DATA, ({ title }, arg) => {
  test(`not (idempotence) | ${title}`, t => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
