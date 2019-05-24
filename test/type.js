import test from 'ava'

import { testCommand } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(datum => {
  const { type, title: titleA } = datum
  test(`[${type}] should find type of ${titleA}`, t =>
    testCommand({ datum, command: 'type', t }))
})
