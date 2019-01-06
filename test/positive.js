'use strict'

const { POSITIVE_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should return positive ${args}`,
  command: 'positive',
  data: POSITIVE_DATA,
})
