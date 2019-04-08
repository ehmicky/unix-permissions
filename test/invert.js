import { performTests } from './helpers/command.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

performTests({
  title: args => `should invert ${args}`,
  command: 'invert',
  data: SIMPLE_DATA,
})
