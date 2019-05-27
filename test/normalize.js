import test from 'ava'
import testEach from 'test-each'

import { normalize } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { stringifyErrors } from './helpers/error.js'

const eNormalize = stringifyErrors(normalize)

testEach(VALID_PARSE_DATA, ({ title }, arg) => {
  test(`normalize (JavaScript) | ${title}`, t => {
    t.snapshot(eNormalize(arg))
  })

  test(`normalize (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('normalize', arg))
  })

  test(`normalize (idempotence) | ${title}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
