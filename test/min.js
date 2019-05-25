import test from 'ava'

import { testCommand } from './helpers/command.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(args => {
  test(`min() ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: 'min', t }))
})
