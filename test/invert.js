import test from 'ava'

import { invert } from '../src/main.js'

import { testCli } from './helpers/cli.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { stringifyErrors } from './helpers/error.js'

const eInvert = stringifyErrors(invert)

SIMPLE_DATA.forEach(arg => {
  test(`invert (JavaScript) ${JSON.stringify(arg)}`, t => {
    t.snapshot(eInvert(arg))
  })

  test(`invert (CLI) ${JSON.stringify(arg)}`, t =>
    testCli({ args: [arg], command: 'invert', t }))
})
