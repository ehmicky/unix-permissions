import test from 'ava'
import { each } from 'test-each'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import { invert } from 'unix-permissions'

import { callCli } from './helpers/cli.js'
import { UNARY_DATA } from './helpers/data/unary.js'

each(UNARY_DATA, ({ title }, arg) => {
  test(`invert (JavaScript) | ${title}`, (t) => {
    t.snapshot(invert(arg))
  })

  test(`invert (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('invert', arg))
  })
})
