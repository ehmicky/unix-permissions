import test from 'ava'
import { each } from 'test-each'
import { max } from 'unix-permissions'

import { callCli } from './helpers/cli.js'
import { BINARY_DATA } from './helpers/data/binary.js'

each(BINARY_DATA, ({ title }, args) => {
  test(`max (JavaScript) | ${title}`, (t) => {
    t.snapshot(max(...args))
  })

  test(`max (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('max', ...args))
  })
})
