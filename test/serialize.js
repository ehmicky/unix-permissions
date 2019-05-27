import test from 'ava'

import { convert } from '../src/main.js'
import { mapValues } from '../src/utils.js'

import { testCli } from './helpers/cli.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { TYPES } from './helpers/data/types.js'
import { stringifyErrors } from './helpers/error.js'

const eConvert = mapValues(convert, stringifyErrors)

TYPES.forEach(type => {
  SIMPLE_DATA.forEach(arg => {
    test(`serialize (JavaScript) ${JSON.stringify(type)} ${JSON.stringify(
      arg,
      // eslint-disable-next-line max-nested-callbacks
    )}`, t => {
      t.snapshot(eConvert[type](arg))
    })

    // eslint-disable-next-line max-nested-callbacks
    test(`serialize (CLI) ${JSON.stringify(type)} ${JSON.stringify(arg)}`, t =>
      testCli({ args: [arg], command: `convert.${type}`, t }))
  })
})
