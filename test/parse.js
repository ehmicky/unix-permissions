import test from 'ava'
import testEach from 'test-each'

import { convert } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { stringifyErrors } from './helpers/error.js'

const eConvertSymbolic = stringifyErrors(convert.symbolic)

testEach(PARSE_DATA, ({ title }, arg) => {
  test(`parse (JavaScript) | ${title}`, t => {
    t.snapshot(eConvertSymbolic(arg))
  })

  test(`parse (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('convert.symbolic', arg))
  })
})
