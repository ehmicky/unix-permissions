import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'
import { TYPES } from './helpers/data/types.js'

TYPES.forEach(type => {
  SIMPLE_DATA.forEach(arg => {
    // eslint-disable-next-line max-nested-callbacks
    test(`serialize ${JSON.stringify(type)} ${JSON.stringify(arg)}`, t =>
      testCommand({ args: [arg], command: `convert.${type}`, t }))
  })
})
