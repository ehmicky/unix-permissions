import test from 'ava'
import testEach from 'test-each'

import { set } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { BINARY_DATA } from './helpers/data/binary.js'
import { stringifyErrors } from './helpers/error.js'

const eSet = stringifyErrors(set)

testEach(BINARY_DATA, ({ title }, args) => {
  test(`set (JavaScript) | ${title}`, t => {
    t.snapshot(eSet(...args))
  })

  test(`set (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('set', ...args))
  })
})
