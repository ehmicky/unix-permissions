'use strict'

const test = require('ava')

const { SIMPLE_DATA, testCommand } = require('./helpers')

SIMPLE_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should invert ${arg}`, t =>
    testCommand({ t, command: 'invert', args: [arg] })),
)
