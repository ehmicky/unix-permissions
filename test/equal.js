'use strict'

const { equal } = require('../src')

const {
  PARSE_DATA,
  EQUAL_DATA,
  performTests,
  performChecks,
} = require('./helpers')

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})

performChecks({
  name: "should 'equal' itself",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.true(equal(arg, arg)),
})
