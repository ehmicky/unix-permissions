import test from 'ava'
import prettyFormat from 'pretty-format'

import { type } from '../src/main.js'

import { testCli } from './helpers/cli.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { stringifyErrors } from './helpers/error.js'

const eType = stringifyErrors(type)

PARSE_DATA.forEach(arg => {
  test(`type (JavaScript) ${prettyFormat(arg, {
    min: true,
    maxDepth: 3,
  })}`, t => {
    t.snapshot(eType(arg))
  })

  test(`type (CLI) ${prettyFormat(arg, { min: true, maxDepth: 3 })}`, async t => {
    t.snapshot(await testCli('type', arg))
  })
})
