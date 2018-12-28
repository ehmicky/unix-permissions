'use strict'

const test = require('ava')

const { contains } = require('../localpack')

const { CONTAINS_DATA, testCommand } = require('./helpers')

CONTAINS_DATA.forEach(args =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should test whether ${args[0]} contains ${args.slice(1)}`, t =>
    testCommand({ t, func: contains, command: 'contains', args })),
)
