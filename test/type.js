import test from 'ava'

import { testCommand } from './helpers/command.js'
import { PARSE_DATA, stringify } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(datum => {
  const {
    type,
    args: [arg],
  } = datum
  test(`type() ${type} ${stringify(arg)}`, t =>
    testCommand({ datum, command: 'type', t }))
})
