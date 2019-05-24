import { performTest } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

PARSE_DATA.forEach(datum => {
  performTest({
    title: ({ type, title }) => `[${type}] should parse ${title}`,
    command: 'convert.symbolic',
    datum,
  })
})
