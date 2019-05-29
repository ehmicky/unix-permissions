import test from 'ava'
import testEach from 'test-each'

import { type } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { FULL_DATA } from './helpers/data/full/main.js'

testEach(FULL_DATA, ({ title }, arg) => {
  test(`type (JavaScript) | ${title}`, t => {
    t.snapshot(type(arg))
  })

  test(`type (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('type', arg))
  })
})
