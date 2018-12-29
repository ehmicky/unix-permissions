'use strict'

const { SET_UNSET_DATA, performTests } = require('./helpers')

performTests({
  title: ([arg, ...args]) => `should set ${arg} with ${args.join(' ')}`,
  command: 'set',
  data: SET_UNSET_DATA,
})
