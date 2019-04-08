import { performTests } from './helpers/command.js'
import { SET_DATA } from './helpers/data/set.js'

performTests({
  title: ([arg, ...args]) => `should set ${arg} with ${args.join(' ')}`,
  command: 'set',
  data: SET_DATA,
})
