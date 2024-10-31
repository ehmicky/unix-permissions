import test from 'ava'
import { each } from 'test-each'

import { callCli } from '../helpers/cli.test.js'
import { BINARY_DATA } from '../helpers/data/binary.test.js'

import { max, min } from 'unix-permissions'

each(BINARY_DATA, ({ title }, args) => {
  test(`min (JavaScript) | ${title}`, (t) => {
    t.snapshot(min(...args))
  })

  test(`min (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('min', ...args))
  })
})

each(BINARY_DATA, ({ title }, args) => {
  test(`max (JavaScript) | ${title}`, (t) => {
    t.snapshot(max(...args))
  })

  test(`max (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli('max', ...args))
  })
})
