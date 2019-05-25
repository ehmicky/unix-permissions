import test from 'ava'

import { testCommand } from './helpers/command.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(args => {
  test(`max() ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: 'max', t }))
})
