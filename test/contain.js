import test from 'ava'
import testEach from 'test-each'

import { contain } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_FULL_DATA } from './helpers/data/full/main.js'
import { BINARY_DATA } from './helpers/data/binary.js'

testEach(BINARY_DATA, ({ title }, args) => {
  test(`contain (JavaScript) | ${title}`, t => {
    try {
      t.snapshot(contain(...args))
    } catch (error) {
      t.snapshot(error)
    }
  })

  test(`contain (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('contain', ...args))
  })
})

testEach(VALID_FULL_DATA, ({ title }, arg) => {
  test(`contain (self) | ${title}`, t => {
    t.true(contain(arg, arg))
  })
})
