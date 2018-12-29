'use strict'

const { PARTIAL_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should return partial ${args}`,
  command: 'partial',
  data: PARTIAL_DATA,
})
