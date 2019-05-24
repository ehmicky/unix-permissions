import test from 'ava'

import { testCommand } from './helpers/command.js'
import { PARSE_DATA, stringify } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(datum => {
  const {
    type,
    args: [arg],
  } = datum
  test(`parse ${type} ${stringify(arg)}`, t =>
    testCommand({ datum, command: 'convert.symbolic', t }))
})
