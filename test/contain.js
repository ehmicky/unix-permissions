import test from 'ava'

import { contain } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

CONTAIN_DATA.forEach(datum => {
  test(`contain() ${datum.map(JSON.stringify).join(' ')}`, t =>
    testCommand({ datum, command: 'contain', t }))
})

VALID_PARSE_DATA.forEach(({ arg }) => {
  test(`should 'contain' itself ${JSON.stringify(arg)}`, t => {
    t.true(contain(arg, arg))
  })
})
