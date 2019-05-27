import test from 'ava'
import testEach from 'test-each'

import { convert } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { FULL_DATA } from './helpers/data/full/main.js'
import { stringifyErrors } from './helpers/error.js'

const eConvertSymbolic = stringifyErrors(convert.symbolic)

testEach(FULL_DATA, ({ title }, arg) => {
  test(`parse (JavaScript) | ${title}`, t => {
    t.snapshot(eConvertSymbolic(arg))
  })

  test(`parse (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('convert.symbolic', arg))
  })
})
