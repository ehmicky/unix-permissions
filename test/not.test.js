import test from 'ava'
import { each } from 'test-each'
import { not, normalize } from 'unix-permissions'

/* jscpd:ignore-start */
import { callCli } from './helpers/cli.js'
import { VALID_FULL_DATA } from './helpers/data/full/main.js'
import { UNARY_DATA } from './helpers/data/unary.js'
/* jscpd:ignore-end */

each(UNARY_DATA, ({ title }, arg) => {
  test(`not (JavaScript) | ${title}`, (t) => {
    t.snapshot(not(arg))
  })

  test(`not (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('not', arg))
  })
})

each(VALID_FULL_DATA, ({ title }, arg) => {
  test(`not (idempotence) | ${title}`, (t) => {
    t.deepEqual(normalize(arg), not(not(arg)))
  })
})
