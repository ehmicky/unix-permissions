import test from 'ava'

import { positive } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { normalizeData } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { POSITIVE_DATA } from './helpers/data/positive.js'

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})

normalizeData(PARSE_DATA).forEach(datum => {
  test(`should have idempotent 'positive' ${JSON.stringify(datum)}`, t => {
    const { arg } = datum
    t.deepEqual(positive(arg), positive(positive(arg)))
  })
})
