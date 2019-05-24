import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

SIMPLE_DATA.forEach(datum => {
  test(`invert() ${JSON.stringify(datum)}`, t => testCommand({ datum, command: 'invert', t }))
})
