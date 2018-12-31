'use strict'

const { EQUAL_DATA, performTests } = require('./helpers')

performTests({
  title: ([arg, ...args]) =>
    `should test whether ${arg} equals ${args.join(' ')}`,
  command: 'equal',
  data: EQUAL_DATA,
})
