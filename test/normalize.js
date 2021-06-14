import test from 'ava'
import { each } from 'test-each'
// eslint-disable-next-line import/no-unresolved, node/no-missing-import
import { normalize } from 'unix-permissions'

import { callCli } from './helpers/cli.js'
import { VALID_FULL_DATA } from './helpers/data/full/main.js'

each(VALID_FULL_DATA, ({ title }, arg) => {
  test(`normalize (JavaScript) | ${title}`, (t) => {
    t.snapshot(normalize(arg))
  })

  test(`normalize (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('normalize', arg))
  })

  test(`normalize (idempotence) | ${title}`, (t) => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
