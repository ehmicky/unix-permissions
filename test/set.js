import test from 'ava'

import { set } from '../src/main.js'

import { callCli } from './helpers/cli.js'
import { SET_DATA } from './helpers/data/set.js'
import { stringifyErrors } from './helpers/error.js'

const eSet = stringifyErrors(set)

SET_DATA.forEach(args => {
  test(`set (JavaScript) ${JSON.stringify(args)}`, t => {
    t.snapshot(eSet(...args))
  })

  test(`set (CLI) ${JSON.stringify(args)}`, async t => {
    t.snapshot(await callCli('set', ...args))
  })
})
