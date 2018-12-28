'use strict'

const test = require('ava')

const { contains } = require('../localpack')

const { CONTAINS_DATA, testCommand } = require('./helpers')

CONTAINS_DATA.forEach(([arg, ...args]) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should test whether ${arg} contains ${args.join(' ')}`, t =>
    testCommand({
      t,
      func: contains,
      command: 'contains',
      args: [arg, ...args],
    })),
)
