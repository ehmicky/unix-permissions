import { SIMPLE_DATA, performTests } from './helpers.js'

performTests({
  title: args => `should invert ${args}`,
  command: 'invert',
  data: SIMPLE_DATA,
})
