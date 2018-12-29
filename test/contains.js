'use strict'

const { CONTAINS_DATA, performTests } = require('./helpers')

performTests({
  data: CONTAINS_DATA,
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contains',
})
