const { MIN_MAX_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should return maximum ${args}`,
  command: 'max',
  data: MIN_MAX_DATA,
})
