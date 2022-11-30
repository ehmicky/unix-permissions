import test from 'ava'
import { each } from 'test-each'
import { min } from 'unix-permissions'

import { callCli } from './helpers/cli.test.js'
import { BINARY_DATA } from './helpers/data/binary.test.js'

each(BINARY_DATA, ({ title }, args) => {
  test(`min (JavaScript) | ${title}`, (t) => {
    t.snapshot(min(...args))
  })

  test(`min (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('min', ...args))
  })
})
