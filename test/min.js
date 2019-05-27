import test from 'ava'

import { min } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'
import { stringifyErrors } from './helpers/error.js'

const eMin = stringifyErrors(min)

MIN_MAX_DATA.forEach(args => {
  test(`min (JavaScript) ${JSON.stringify(args)}`, t => {
    t.snapshot(eMin(...args))
  })

  test(`min (CLI) ${JSON.stringify(args)}`, async t => {
    t.snapshot(await callCli('min', ...args))
  })
})
