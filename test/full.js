'use strict'

const test = require('ava')

const { full } = require('../localpack')

const { SIMPLE_DATA, testCommand } = require('./helpers')

SIMPLE_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should return full ${arg}`, t =>
    testCommand({ t, func: full, command: 'full', args: [arg] })),
)
