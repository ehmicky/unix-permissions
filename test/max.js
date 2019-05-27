import test from 'ava'

import { max } from '../src/main.js'

import { testCli } from './helpers/cli.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'
import { stringifyErrors } from './helpers/error.js'

const eMax = stringifyErrors(max)

MIN_MAX_DATA.forEach(args => {
  test(`max (JavaScript) ${JSON.stringify(args)}`, t => {
    t.snapshot(eMax(...args))
  })

  test(`max (CLI) ${JSON.stringify(args)}`, t =>
    testCli({ args, command: 'max', t }))
})
