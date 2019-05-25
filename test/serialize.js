import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(({ type, arg }) => {
  test(`serialize ${JSON.stringify({ type, arg })}`, t =>
    testCommand({ args: [arg], command: `convert.${type}`, t }))
})
