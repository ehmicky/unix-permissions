const { SIMPLE_DATA, performTests } = require('./helpers')

performTests({
  title: args => `should invert ${args}`,
  command: 'invert',
  data: SIMPLE_DATA,
})
