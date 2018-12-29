'use strict'

const { SET_UNSET_DATA, performTests } = require('./helpers')

performTests({
  data: SET_UNSET_DATA,
  title: ([arg, ...args]) => `should set ${arg} with ${args.join(' ')}`,
  command: 'set',
})
