import test from 'ava'

import { positive } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'

POSITIVE_DATA.forEach(datum => {
  test(`positive() ${datum}`, t =>
    testCommand({ datum, command: 'positive', t }))
})

VALID_PARSE_DATA.forEach(({ arg }) => {
  test(`should have idempotent 'positive' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(positive(arg), positive(positive(arg)))
  })
})
