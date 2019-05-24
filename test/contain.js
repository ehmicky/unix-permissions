import test from 'ava'

import { contain } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { normalizeData } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contain',
  data: CONTAIN_DATA,
})

normalizeData(PARSE_DATA).forEach(datum => {
  test(`should 'contain' itself ${JSON.stringify(datum)}`, t => {
    const { arg } = datum
    t.true(contain(arg, arg))
  })
})
