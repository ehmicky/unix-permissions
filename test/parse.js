import { performTests } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should parse ${title}`,
  command: 'convert.symbolic',
  data: PARSE_DATA,
})
