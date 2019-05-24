import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(datum => {
  const {
    type,
    args: [arg],
  } = datum
  test(`serialize ${type} ${JSON.stringify(arg)}`, t =>
    testCommand({ datum, command: `convert.${type}`, t }),
  )
})
