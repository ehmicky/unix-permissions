'use strict'

const test = require('ava')

const { normalize } = require('../localpack')

const { PARSE_DATA, testCommand } = require('./helpers')

PARSE_DATA.forEach(({ type, args, title }) =>
  // eslint-disable-next-line max-nested-callbacks
  test(`[${type}] should normalize ${title}`, t =>
    testCommand({ t, func: normalize, command: 'normalize', args })),
)
