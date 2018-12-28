'use strict'

const test = require('ava')

const { invert } = require('../localpack')

const { FLIP_DATA, testCommand } = require('./helpers')

FLIP_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should invert ${arg}`, t =>
    testCommand({ t, func: invert, command: 'invert', args: [arg] })),
)
