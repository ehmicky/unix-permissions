import test from 'ava'

import { not } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { normalizeData } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

performTests({
  title: args => `should negate ${args}`,
  command: 'not',
  data: SIMPLE_DATA,
})

normalizeData(PARSE_DATA).forEach(datum => {
  test(`should have idempotent 'not' ${JSON.stringify(datum)}`, t => {
    const { arg } = datum
    t.deepEqual(arg, not(not(arg)))
  })
})
