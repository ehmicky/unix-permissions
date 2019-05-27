import test from 'ava'

import { not, normalize } from '../src/main.js'

import { testCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { stringifyErrors } from './helpers/error.js'

const eNot = stringifyErrors(not)

SIMPLE_DATA.forEach(arg => {
  test(`not (JavaScript) ${JSON.stringify(arg)}`, t => {
    t.snapshot(eNot(arg))
  })

  test(`not (CLI) ${JSON.stringify(arg)}`, async t => {
    t.snapshot(await testCli('not', arg))
  })
})

VALID_PARSE_DATA.forEach(arg => {
  test(`not idempotence ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
