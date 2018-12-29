'use strict'

const { MIN_MAX_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should return minimum ${args}`,
  command: 'min',
  data: MIN_MAX_DATA,
})
