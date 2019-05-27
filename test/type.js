import test from 'ava'
import testEach from 'test-each'

import { type } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { PARSE_DATA } from './helpers/data/full/main.js'
import { stringifyErrors } from './helpers/error.js'

const eType = stringifyErrors(type)

testEach(PARSE_DATA, ({ title }, arg) => {
  test(`type (JavaScript) | ${title}`, t => {
    t.snapshot(eType(arg))
  })

  test(`type (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('type', arg))
  })
})
