import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SET_DATA } from './helpers/data/set.js'

SET_DATA.forEach(datum => {
  const title = ([arg, ...args]) => `should set ${arg} with ${args.join(' ')}`
  test(title(datum), t => testCommand({ datum, command: 'set', t }))
})
