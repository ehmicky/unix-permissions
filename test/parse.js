import test from 'ava'
import prettyFormat from 'pretty-format'

import { convert } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { stringifyErrors } from './helpers/error.js'

const eConvertSymbolic = stringifyErrors(convert.symbolic)

PARSE_DATA.forEach(arg => {
  test(`parse (JavaScript) ${prettyFormat(arg, {
    min: true,
    maxDepth: 3,
  })}`, t => {
    t.snapshot(eConvertSymbolic(arg))
  })

  test(`parse (CLI) ${prettyFormat(arg, {
    min: true,
    maxDepth: 3,
  })}`, async t => {
    t.snapshot(await callCli('convert.symbolic', arg))
  })
})
