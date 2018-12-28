'use strict'

const test = require('ava')

const { PARTIAL_DATA, testCommand } = require('./helpers')

PARTIAL_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should return partial ${arg}`, t =>
    testCommand({ t, command: 'partial', args: [arg] })),
)
