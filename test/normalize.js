import test from 'ava'

import { normalize } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'

VALID_PARSE_DATA.forEach(datum => {
  const title = ({ type, title: titleA }) =>
    `[${type}] should normalize ${titleA}`
  test(title(datum), t => testCommand({ datum, command: 'normalize', t }))
})

VALID_PARSE_DATA.forEach(({ args: [arg] }) => {
  test(`should have idempotent 'normalize' ${JSON.stringify(arg)}`, t => {
    t.deepEqual(normalize(arg), normalize(normalize(arg)))
  })
})
