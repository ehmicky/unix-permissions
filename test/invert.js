import { performTest } from './helpers/command.js'
import { SIMPLE_DATA } from './helpers/data/simple.js'

SIMPLE_DATA.forEach(datum => {
  performTest({
    title: args => `should invert ${args}`,
    command: 'invert',
    datum,
  })
})
