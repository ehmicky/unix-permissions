import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(datum => {
  const { type, arg } = datum
  test(`serialize ${JSON.stringify({ type, arg })}`, t =>
    testCommand({ datum, command: `convert.${type}`, t }))
})
