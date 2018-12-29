'use strict'

const { PARSE_DATA, performTests } = require('./helpers')

performTests({
  data: PARSE_DATA,
  title: ({ type, title }) => `[${type}] should find type of ${title}`,
  command: 'type',
})
