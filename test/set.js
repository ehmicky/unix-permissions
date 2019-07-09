import test from 'ava'
import { each } from 'test-each'

import { set } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { BINARY_DATA } from './helpers/data/binary.js'

each(BINARY_DATA, ({ title }, args) => {
  test(`set (JavaScript) | ${title}`, t => {
    try {
      t.snapshot(set(...args))
    } catch (error) {
      t.snapshot(error)
    }
  })

  test(`set (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('set', ...args))
  })
})
