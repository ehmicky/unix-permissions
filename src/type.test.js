import test from 'ava'
import { each } from 'test-each'

import { callCli } from './helpers/cli.test.js'
import { FULL_DATA } from './helpers/data/full/main.test.js'

import { type } from 'unix-permissions'

each(FULL_DATA, ({ title }, arg) => {
  test(`type (JavaScript) | ${title}`, (t) => {
    t.snapshot(type(arg))
  })

  test(`type (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('type', arg))
  })
})
