import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

SIMPLE_DATA.forEach(arg => {
  test(`invert() ${JSON.stringify(arg)}`, t =>
    testCommand({ args: [arg], command: 'invert', t }))
})
