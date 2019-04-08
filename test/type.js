import { PARSE_DATA, performTests } from './helpers.js'

performTests({
  title: ({ type, title }) => `[${type}] should find type of ${title}`,
  command: 'type',
  data: PARSE_DATA,
})
