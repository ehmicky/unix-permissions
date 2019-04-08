import { MIN_MAX_DATA, performTests } from './helpers.js'

performTests({
  title: args => `should return maximum ${args}`,
  command: 'max',
  data: MIN_MAX_DATA,
})
