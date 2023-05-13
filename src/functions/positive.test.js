import test from 'ava'
import { each } from 'test-each'
import { positive } from 'unix-permissions'

import { callCli } from '../helpers/cli.test.js'
import { VALID_FULL_DATA } from '../helpers/data/full/main.test.js'
import { UNARY_DATA } from '../helpers/data/unary.test.js'

each(UNARY_DATA, ({ title }, arg) => {
  test(`positive (JavaScript) | ${title}`, (t) => {
    t.snapshot(positive(arg))
  })

  test(`positive (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('positive', arg))
  })
})

each(VALID_FULL_DATA, ({ title }, arg) => {
  test(`positive (idempotence) | ${title}`, (t) => {
    t.deepEqual(positive(arg), positive(positive(arg)))
  })
})
