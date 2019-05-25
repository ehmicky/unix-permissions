import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SET_DATA } from './helpers/data/set.js'

SET_DATA.forEach(args => {
  test(`set() ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: 'set', t }))
})
