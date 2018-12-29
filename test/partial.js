'use strict'

const { PARTIAL_DATA, performTests } = require('./helpers')

performTests({
  data: PARTIAL_DATA,
  title: args => `should return partial ${args}`,
  command: 'partial',
})
