import { performTest } from './helpers/command.js'
import { SET_DATA } from './helpers/data/set.js'

SET_DATA.forEach(datum => {
  performTest({
    title: ([arg, ...args]) => `should set ${arg} with ${args.join(' ')}`,
    command: 'set',
    datum,
  })
})
