import { normalize } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performCheck } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})

PARSE_DATA.forEach(datum => {
  const title = `should have idempotent 'normalize' ${JSON.stringify(datum)}`
  performCheck(
    {
      title,
      check: ({ t, arg }) => t.deepEqual(arg, normalize(arg)),
    },
    datum,
  )
})
