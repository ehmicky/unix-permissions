import test from 'ava'

import { equal } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { normalizeData } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})

normalizeData(PARSE_DATA).forEach(datum => {
  const title = `should 'equal' itself ${JSON.stringify(datum)}`
  const check = ({ t, arg }) => t.true(equal(arg, arg))
  test(title, t => check({ t, ...datum }))
})
