import { performTest } from './helpers/command.js'
import { MIN_MAX_DATA } from './helpers/data/min_max.js'

MIN_MAX_DATA.forEach(datum => {
  performTest({
    title: args => `should return maximum ${args}`,
    command: 'max',
    datum,
  })
})
