'use strict'

const { SET_UNSET_DATA, performTests } = require('./helpers')

performTests({
  title: ([arg, ...args]) => `should unset ${arg} with ${args.join(' ')}`,
  command: 'unset',
  data: SET_UNSET_DATA,
})
