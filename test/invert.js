'use strict'

const { SIMPLE_DATA, performTests } = require('./helpers')

performTests({
  data: SIMPLE_DATA,
  title: args => `should invert ${args}`,
  command: 'invert',
})
