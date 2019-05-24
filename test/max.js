import test from 'ava'

import { testCommand } from './helpers/command.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(datum => {
  test(`max() ${datum}`, t => testCommand({ datum, command: 'max', t }))
})
