import { MIN_MAX_DATA, performTests } from './helpers.js'

performTests({
  title: args => `should return minimum ${args}`,
  command: 'min',
  data: MIN_MAX_DATA,
})
