import test from 'ava'
import { each } from 'test-each'

import { callCli } from './helpers/cli.test.js'
import { FULL_DATA } from './helpers/data/full/main.test.js'

import { convert } from 'unix-permissions'

each(FULL_DATA, ({ title }, arg) => {
  test(`parse (JavaScript) | ${title}`, (t) => {
    try {
      t.snapshot(convert.symbolic(arg))
    } catch (error) {
      t.snapshot(error)
    }
  })

  test(`parse (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('convert.symbolic', arg))
  })
})
