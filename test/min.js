import test from 'ava'

import { testCommand } from './helpers/command.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(datum => {
  const title = args => `should return minimum ${args}`
  test(title(datum), t => testCommand({ datum, command: 'min', t }))
})
