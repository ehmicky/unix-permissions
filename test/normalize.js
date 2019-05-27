import test from 'ava'

import { normalize } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { stringifyErrors } from './helpers/error.js'

const eNormalize = stringifyErrors(normalize)

VALID_PARSE_DATA.forEach(arg => {
  test(`normalize (JavaScript) ${JSON.stringify(arg)}`, t => {
    t.snapshot(eNormalize(arg))
  })

  test(`normalize (CLI) ${JSON.stringify(arg)}`, async t => {
    t.snapshot(await callCli('normalize', arg))
  })

  test(`normalize idempotence ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
