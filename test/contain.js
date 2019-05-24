import { contain } from '../src/main.js'

import { performTests } from './helpers/command.js'
import { performCheck, normalizeData } from './helpers/check.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'
import { CONTAIN_DATA } from './helpers/data/contain.js'

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contain',
  data: CONTAIN_DATA,
})

normalizeData(PARSE_DATA).forEach(datum => {
  const title = `should 'contain' itself ${JSON.stringify(datum)}`
  performCheck(
    {
      title,
      check: ({ t, arg }) => t.true(contain(arg, arg)),
    },
    datum,
  )
})
