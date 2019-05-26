import test from 'ava'

import { max } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(args => {
  test(`max (JavaScript) ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: max, t }))

  test(`max (CLI) ${JSON.stringify(args)}`, t =>
    testCli({ args, command: 'max', t }))
})
