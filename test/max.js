import { performTests } from './helpers/command.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

performTests({
  title: args => `should return maximum ${args}`,
  command: 'max',
  data: MIN_MAX_DATA,
})
