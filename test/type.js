import { performTests } from './helpers/command.js'
import { PARSE_DATA } from './helpers/data/parse/main.js'

performTests({
  title: ({ type, title }) => `[${type}] should find type of ${title}`,
  command: 'type',
  data: PARSE_DATA,
})
