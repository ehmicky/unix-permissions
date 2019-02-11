'use strict'

const { not } = require('..')

const {
  SIMPLE_DATA,
  PARSE_DATA,
  performTests,
  performChecks,
} = require('./helpers')

performTests({
  title: args => `should negate ${args}`,
  command: 'not',
  data: SIMPLE_DATA,
})

performChecks({
  name: "should have idempotent 'not'",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.deepEqual(arg, not(not(arg))),
})
