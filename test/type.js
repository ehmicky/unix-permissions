'use strict'

const { PARSE_DATA, performTests } = require('./helpers')

performTests({
  title: ({ type, title }) => `[${type}] should find type of ${title}`,
  command: 'type',
  data: PARSE_DATA,
})
