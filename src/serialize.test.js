import test from 'ava'
import { each } from 'test-each'

import { callCli } from './helpers/cli.test.js'
import { TYPES } from './helpers/data/types.test.js'
import { UNARY_DATA } from './helpers/data/unary.test.js'

import { convert } from 'unix-permissions'

each(TYPES, UNARY_DATA, ({ title }, type, arg) => {
  test(`serialize (JavaScript) | ${title}`, (t) => {
    t.snapshot(convert[type](arg))
  })

  test(`serialize (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli(`convert.${type}`, arg))
  })
})
