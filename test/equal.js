import { equal } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performCheck } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { EQUAL_DATA } from './helpers/data/equal.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})

PARSE_DATA.forEach(datum => {
  const title = `should 'equal' itself ${JSON.stringify(datum)}`
  performCheck(
    {
      title,
      check: ({ t, arg }) => t.true(equal(arg, arg)),
    },
    datum,
  )
})
