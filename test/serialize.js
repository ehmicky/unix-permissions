import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(datum => {
  test(`serialize ${JSON.stringify(datum)}`, t =>
    testCommand({ datum, command: `convert.${datum.type}`, t }))
})
