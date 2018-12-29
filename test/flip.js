'use strict'

const { SIMPLE_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should flip ${args}`,
  command: 'flip',
  data: SIMPLE_DATA,
})
