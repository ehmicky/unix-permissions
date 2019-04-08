import { PARSE_DATA, performTests } from './helpers.js'

performTests({
  title: ({ type, title }) => `[${type}] should parse ${title}`,
  command: 'convert.symbolic',
  data: PARSE_DATA,
})
