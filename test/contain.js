'use strict'

const { contain } = require('../localpack')

const {
  PARSE_DATA,
  CONTAIN_DATA,
  performTests,
  performChecks,
} = require('./helpers')

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contain',
  data: CONTAIN_DATA,
})

performChecks({
  name: "should 'contain' itself",
  data: PARSE_DATA,
  check: ({ t, arg }) => t.true(contain(arg, arg)),
})
