'use strict'

const { SIMPLE_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should return full ${args}`,
  command: 'full',
  data: SIMPLE_DATA,
})
