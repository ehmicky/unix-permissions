'use strict'

const { CONTAINS_DATA, performTests } = require('./helpers')

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} contains ${args.join(' ')}`,
  command: 'contains',
  data: CONTAINS_DATA,
})
