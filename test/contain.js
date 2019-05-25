import test from 'ava'

import { contain } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

CONTAIN_DATA.forEach(args => {
  test(`contain() ${JSON.stringify(args)}`, t =>
    testCommand({ args, command: 'contain', t }))
})

VALID_PARSE_DATA.forEach(({ type, arg }) => {
  test(`contain() self ${JSON.stringify({ type, arg })}`, t => {
    t.true(contain(arg, arg))
  })
})
