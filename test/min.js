import test from 'ava'
import testEach from 'test-each'

import { min } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'
import { stringifyErrors } from './helpers/error.js'

const eMin = stringifyErrors(min)

testEach(MIN_MAX_DATA, ({ title }, args) => {
  test(`min (JavaScript) | ${title}`, t => {
    t.snapshot(eMin(...args))
  })

  test(`min (CLI) | ${title}`, async t => {
    t.snapshot(await callCli('min', ...args))
  })
})
