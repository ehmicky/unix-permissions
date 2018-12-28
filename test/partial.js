'use strict'

const test = require('ava')

const { partial } = require('../localpack')

const { PARTIAL_DATA, testCommand } = require('./helpers')

PARTIAL_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should return partial ${arg}`, t =>
    testCommand({ t, func: partial, command: 'partial', args: [arg] })),
)
