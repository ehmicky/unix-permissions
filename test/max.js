import test from 'ava'

import { max } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'
import { stringifyErrors } from './helpers/error.js'

const eMax = stringifyErrors(max)

MIN_MAX_DATA.forEach(args => {
  test(`max (JavaScript) ${JSON.stringify(args)}`, t => {
    t.snapshot(eMax(...args))
  })

  test(`max (CLI) ${JSON.stringify(args)}`, async t => {
    t.snapshot(await callCli('max', ...args))
  })
})
