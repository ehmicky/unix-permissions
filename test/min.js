import test from 'ava'

import { min } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(args => {
  test(`min (JavaScript) ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: min, t }))

  test(`min (CLI) ${JSON.stringify(args)}`, t =>
    testCli({ args, command: 'min', t }))
})
