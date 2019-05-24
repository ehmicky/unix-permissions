import test from 'ava'

import { testCommand } from './helpers/command.js'
import { stringify } from './helpers/data/parse/main.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(datum => {
  const {
    type,
    args: [arg],
  } = datum
  const title = () => `serialize ${type} ${JSON.stringify((arg))}`
  test(title(datum), t =>
    testCommand({ datum, command: ({ type }) => `convert.${type}`, t }),
  )
})
