import test from 'ava'
import prettyFormat from 'pretty-format'

import { testCommand } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(({ type, arg }) => {
  test(`parse ${prettyFormat({ type, arg }, { min: true, maxDepth: 3 })}`, t =>
    testCommand({ args: [arg], command: 'convert.symbolic', t }))
})
