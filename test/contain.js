import test from 'ava'

import { contain } from '../src/main.js'

import { testCli } from './helpers/cli.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'
import { stringifyErrors } from './helpers/error.js'

const eContain = stringifyErrors(contain)

CONTAIN_DATA.forEach(args => {
  test(`contain (JavaScript) ${JSON.stringify(args)}`, t => {
    t.snapshot(eContain(...args))
  })

  test(`contain (CLI) ${JSON.stringify(args)}`, async t => {
    t.snapshot(await testCli('contain', ...args))
  })
})

VALID_PARSE_DATA.forEach(arg => {
  test(`contain self ${JSON.stringify(arg)}`, t => {
    t.true(contain(arg, arg))
  })
})
