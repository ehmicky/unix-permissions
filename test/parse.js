'use strict'

const { PARSE_DATA, performTests } = require('./helpers')

performTests({
  title: ({ type, title }) => `[${type}] should parse ${title}`,
  command: 'convert.symbolic',
  data: PARSE_DATA,
})
