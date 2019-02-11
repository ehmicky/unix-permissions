'use strict'

const { positive } = require('..')

const {
  PARSE_DATA,
  POSITIVE_DATA,
  performTests,
  performChecks,
} = require('./helpers')

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})

performChecks({
  name: "should have idempotent 'positive'",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.deepEqual(positive(arg), positive(positive(arg))),
})
