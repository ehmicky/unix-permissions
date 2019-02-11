'use strict'

const { normalize } = require('..')

const { PARSE_DATA, performTests, performChecks } = require('./helpers')

performTests({
  title: ({ type, title }) => `[${type}] should normalize ${title}`,
  command: 'normalize',
  data: PARSE_DATA,
})

performChecks({
  name: "should have idempotent 'normalize'",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.deepEqual(arg, normalize(arg)),
})
