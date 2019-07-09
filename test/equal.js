import test from 'ava'
import { each } from 'test-each'

import { equal } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { BINARY_DATA } from './helpers/data/binary.js'
import { VALID_FULL_DATA } from './helpers/data/full/main.js'

each(BINARY_DATA, ({ title }, args) => {
  test(`equal (JavaScript) | ${title}`, t => {
    try {
      t.snapshot(equal(...args))
    } catch (error) {
      t.snapshot(error)
    }
  })

  test(`equal (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('equal', ...args))
  })
})

each(VALID_FULL_DATA, ({ title }, arg) => {
  test(`equal (self) | ${title}`, t => {
    t.true(equal(arg, arg))
  })
})
