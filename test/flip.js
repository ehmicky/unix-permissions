'use strict'

const test = require('ava')

const { flip } = require('../localpack')

const { FLIP_DATA, testCommand } = require('./helpers')

FLIP_DATA.forEach(arg =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should flip ${arg}`, t =>
    testCommand({ t, func: flip, command: 'flip', args: [arg] })),
)
