import test from 'ava'
import testEach from 'test-each'

import { convert } from '../src/main.js'
import { mapValues } from '../src/utils.js'

import { callCli } from './helpers/cli.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { TYPES } from './helpers/data/types.js'
import { stringifyErrors } from './helpers/error.js'

const eConvert = mapValues(convert, stringifyErrors)

testEach(TYPES, SIMPLE_DATA, ({ title }, type, arg) => {
  test(`serialize (JavaScript) | ${title}`, t => {
    t.snapshot(eConvert[type](arg))
  })

  test(`serialize (CLI) | ${title}`, async t => {
    t.snapshot(await callCli(`convert.${type}`, arg))
  })
})
