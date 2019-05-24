import test from 'ava'

import { testCommand } from './helpers/command.js'
import { SERIALIZE_DATA } from './helpers/data/serialize.js'

SERIALIZE_DATA.forEach(datum => {
  const title = ({ type, title: titleA }) => `serialize ${type} ${titleA}`
  test(title(datum), t =>
    testCommand({ datum, command: ({ type }) => `convert.${type}`, t }),
  )
})
