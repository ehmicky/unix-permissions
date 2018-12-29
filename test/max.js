'use strict'

const { MIN_MAX_DATA, performTests } = require('./helpers')

performTests({
  data: MIN_MAX_DATA,
  title: args => `should return maximum ${args}`,
  command: 'max',
})
