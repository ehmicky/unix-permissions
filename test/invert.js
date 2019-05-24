import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

SIMPLE_DATA.forEach(datum => {
  const title = args => `should invert ${args}`
  test(title(datum), t => testCommand({ datum, command: 'invert', t }))
})
