'use strict'

const test = require('ava')

const { invert } = require('../localpack')

const { SIMPLE_DATA, testCommand } = require('./helpers')

SIMPLE_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should invert ${arg}`, t =>
    testCommand({ t, func: invert, command: 'invert', args: [arg] })),
)
