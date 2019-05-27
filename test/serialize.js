import test from 'ava'

import { convert } from '../src/main.js'
import { mapValues } from '../src/utils.js'

import { callCli } from './helpers/cli.js'
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

    test(`serialize (CLI) ${JSON.stringify(type)} ${JSON.stringify(
      arg,
      // eslint-disable-next-line max-nested-callbacks
    )}`, async t => {
      t.snapshot(await callCli(`convert.${type}`, arg))
    })
  })
})
