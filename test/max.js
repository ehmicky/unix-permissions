'use strict'

const test = require('ava')

const { max } = require('../localpack')

const { MIN_MAX_DATA, testCommand } = require('./helpers')

MIN_MAX_DATA.forEach(args =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should return maximum ${args}`, t =>
    testCommand({ t, func: max, command: 'max', args })),
)
