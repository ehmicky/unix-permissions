import test from 'ava'
import testEach from 'test-each'

import { not, normalize } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { UNARY_DATA } from './helpers/data/unary.js'
import { VALID_FULL_DATA } from './helpers/data/full/main.js'

testEach(UNARY_DATA, ({ title }, arg) => {
  test(`not (JavaScript) | ${title}`, t => {
    t.snapshot(not(arg))
  })

  test(`not (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('not', arg))
  })
})

testEach(VALID_FULL_DATA, ({ title }, arg) => {
  test(`not (idempotence) | ${title}`, t => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
