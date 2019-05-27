import test from 'ava'

import { positive } from '../src/main.js'

import { testCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'
import { stringifyErrors } from './helpers/error.js'

const ePositive = stringifyErrors(positive)

POSITIVE_DATA.forEach(arg => {
  test(`positive (JavaScript) ${JSON.stringify(arg)}`, t => {
    t.snapshot(ePositive(arg))
  })

  test(`positive (CLI) ${JSON.stringify(arg)}`, t =>
    testCli({ args: [arg], command: 'positive', t }))
})

VALID_PARSE_DATA.forEach(arg => {
  test(`positive idempotence ${JSON.stringify(arg)}`, t => {
    t.deepEqual(positive(arg), positive(positive(arg)))
  })
})
