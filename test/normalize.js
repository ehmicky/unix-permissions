'use strict'

const { PARSE_DATA, performTests } = require('./helpers')

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})
