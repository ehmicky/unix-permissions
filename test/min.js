'use strict'

const test = require('ava')

const { min } = require('../localpack')

const { MIN_MAX_DATA, testCommand } = require('./helpers')

MIN_MAX_DATA.forEach(args =>
  // eslint-disable-next-line max-nested-callbacks
  test(`should return minimum ${args}`, t =>
    testCommand({ t, func: min, command: 'min', args })),
)
