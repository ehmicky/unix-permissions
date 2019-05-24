import test from 'ava'

import { contain } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { VALID_PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

CONTAIN_DATA.forEach(datum => {
  const title = ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`
  test(title(datum), t => testCommand({ datum, command: 'contain', t }))
})

VALID_PARSE_DATA.forEach(({ args: [arg] }) => {
  test(`should 'contain' itself ${JSON.stringify(arg)}`, t => {
    t.true(contain(arg, arg))
  })
})
