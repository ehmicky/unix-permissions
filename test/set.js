import { SET_DATA, performTests } from './helpers.js'

performTests({
  title: ([arg, ...args]) => `should set ${arg} with ${args.join(' ')}`,
  command: 'set',
  data: SET_DATA,
})
