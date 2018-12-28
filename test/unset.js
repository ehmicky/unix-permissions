'use strict'

const test = require('ava')

const { unset } = require('../localpack')

const { SET_UNSET_DATA, testCommand } = require('./helpers')

SET_UNSET_DATA.forEach(([arg, ...args]) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should unset ${arg} with ${args.join(' ')}`, t =>
    testCommand({ t, func: unset, command: 'unset', args: [arg, ...args] })),
)
