import test from 'ava'
import { each } from 'test-each'
import { convert } from 'unix-permissions'

import { callCli } from './helpers/cli.js'
import { TYPES } from './helpers/data/types.js'
import { UNARY_DATA } from './helpers/data/unary.js'

each(TYPES, UNARY_DATA, ({ title }, type, arg) => {
  test(`serialize (JavaScript) | ${title}`, (t) => {
    t.snapshot(convert[type](arg))
  })

  test(`serialize (CLI) | ${title}`, async (t) => {
    t.snapshot(await callCli(`convert.${type}`, arg))
  })
})
