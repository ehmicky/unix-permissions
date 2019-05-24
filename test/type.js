import test from 'ava'

import { testCommand } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(datum => {
  const title = ({ type, title: titleA }) =>
    `[${type}] should find type of ${titleA}`
  test(title(datum), t => testCommand({ datum, command: 'type', t }))
})
