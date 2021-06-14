import test from 'ava'
import { each } from 'test-each'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import { convert } from 'unix-permissions'

import { callCli } from './helpers/cli.js'
import { FULL_DATA } from './helpers/data/full/main.js'

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
