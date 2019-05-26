import test from 'ava'

import { convert } from '../src/main.js'

import { testCommand } from './helpers/command.js'
import { testCli } from './helpers/cli.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { TYPES } from './helpers/data/types.js'

TYPES.forEach(type => {
  SIMPLE_DATA.forEach(arg => {
    test(`serialize (JavaScript) ${JSON.stringify(type)} ${JSON.stringify(
      arg,
    )}`, // eslint-disable-next-line max-nested-callbacks
    t => testCommand({ args: [arg], command: convert[type], t }))

    // eslint-disable-next-line max-nested-callbacks
    test(`serialize (CLI) ${JSON.stringify(type)} ${JSON.stringify(arg)}`, t =>
      testCli({ args: [arg], command: `convert.${type}`, t }))
  })
})
