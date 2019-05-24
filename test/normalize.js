import test from 'ava'

import { normalize } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { normalizeData } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})

normalizeData(PARSE_DATA).forEach(datum => {
  test(`should have idempotent 'normalize' ${JSON.stringify(datum)}`, t => {
    const { arg } = datum
    t.deepEqual(arg, normalize(arg))
  })
})
