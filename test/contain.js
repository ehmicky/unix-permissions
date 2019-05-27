import test from 'ava'
import testEach from 'test-each'

import { contain } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { BINARY_DATA } from './helpers/data/binary.js'
import { stringifyErrors } from './helpers/error.js'

const eContain = stringifyErrors(contain)

testEach(BINARY_DATA, ({ title }, args) => {
  test(`contain (JavaScript) | ${title}`, t => {
    t.snapshot(eContain(...args))
  })

  test(`contain (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('contain', ...args))
  })
})

testEach(VALID_PARSE_DATA, ({ title }, arg) => {
  test(`contain (self) | ${title}`, t => {
    t.true(contain(arg, arg))
  })
})
