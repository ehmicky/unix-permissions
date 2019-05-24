import test from 'ava'
import prettyFormat from 'pretty-format'

import { testCommand } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(datum => {
  const { type, arg } = datum
  test(`parse ${prettyFormat({ type, arg }, { min: true, maxDepth: 3 })}`, t =>
    testCommand({ datum, command: 'convert.symbolic', t }))
})
