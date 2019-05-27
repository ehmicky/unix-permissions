import test from 'ava'
import prettyFormat from 'pretty-format'

import { convert } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { stringifyErrors } from './helpers/error.js'

const eConvertSymbolic = stringifyErrors(convert.symbolic)

PARSE_DATA.forEach(arg => {
  test(`parse (JavaScript) ${prettyFormat(arg, {
    min: true,
    maxDepth: 3,
  })}`, t => testCommand({ args: [arg], command: eConvertSymbolic, t }))

  test(`parse (CLI) ${prettyFormat(arg, { min: true, maxDepth: 3 })}`, t =>
    testCli({ args: [arg], command: 'convert.symbolic', t }))
})
