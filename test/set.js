import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SET_DATA } from './helpers/data/set.js'

SET_DATA.forEach(datum => {
  test(`set() ${datum.map(JSON.stringify).join(' ')}`, t =>
    testCommand({ datum, command: 'set', t }))
})
