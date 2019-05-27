import test from 'ava'
import testEach from 'test-each'

import { positive } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'
import { stringifyErrors } from './helpers/error.js'

const ePositive = stringifyErrors(positive)

testEach(POSITIVE_DATA, ({ title }, arg) => {
  test(`positive (JavaScript) | ${title}`, t => {
    t.snapshot(ePositive(arg))
  })

  test(`positive (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('positive', arg))
  })
})

testEach(VALID_PARSE_DATA, ({ title }, arg) => {
  test(`positive (idempotence) | ${title}`, t => {
    t.deepEqual(positive(arg), positive(positive(arg)))
  })
})
