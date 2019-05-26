import test from 'ava'

import { set } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { SET_DATA } from './helpers/data/set.js'

SET_DATA.forEach(args => {
  test(`set (JavaScript) ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: set, t }))

  test(`set (CLI) ${JSON.stringify(args)}`, t =>
    testCli({ args, command: 'set', t }))
})
